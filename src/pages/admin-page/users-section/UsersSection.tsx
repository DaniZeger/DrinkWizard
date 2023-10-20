import { useEffect, useState } from 'react';
import { USER } from '../../../types/UserType';
import { userApi } from '../../../api/userApi';
import AccordionHeader from '../accordion-header/AccordionHeader';
import ItemHeader from '../accordion-item/ItemHeader';
import AccordionItem from '../accordion-item/AccordionItem';
import AccordionTable from '../accordion-item/AccordionTable';
import { formatDate } from '../../../helpers/Formatter';
import EditDataButtons from '../../../components/buttons/edit-data-buttons/EditDataButtons';

function UsersSection() {
    const [users, setUsers] = useState<USER[]>()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        userApi.getUsers()
            .then(json => setUsers(json))
    }, [])

    function deleteUser(id: string) {
        userApi.deleteUser(id)
            .then(() =>
                userApi.getUsers()
                    .then(json => setUsers(json))
            )
    }
    return (
        <>
            <AccordionHeader
                collectionName='Users'
                collectionLength={users ? users.length : 0}
                handleOpen={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
            />
            {
                isOpen &&
                <div className='users-section'>
                    <ItemHeader>
                        <li style={{ width: '3%' }}>#</li>
                        <li style={{ width: '17%' }}>Name</li>
                        <li style={{ width: '19%' }}>Email</li>
                        <li style={{ width: '15%' }}>Phone</li>
                        <li style={{ width: '20.5%' }}>Address</li>
                        <li style={{ width: '13%' }}>Is Admin</li>
                        <li style={{ width: '12.5%', textAlign: 'center' }}>Actions</li>
                    </ItemHeader>

                    <AccordionItem>
                        {
                            users &&
                            users.map((user, index) =>
                                <AccordionTable>
                                    <li style={{ width: '3%' }}>{index + 1}</li>
                                    <li style={{ width: '17%' }}>
                                        {user.firstName} {' '} {user.lastName}
                                    </li>
                                    <li style={{ width: '19%' }}>{user.email}</li>
                                    <li style={{ width: '15%' }}>{user.country_code} {' '} {user.phone}</li>
                                    <li style={{ width: '20.5%' }}>{user.address}</li>
                                    <li style={{ width: '11%' }}>{user.isAdmin ? 'YES' : 'NO'}</li>
                                    <li style={{ width: '12.5%', textAlign: 'center' }}>
                                        <EditDataButtons
                                            isAdminPage
                                            data='user'
                                            target={user?._id ? `user/${user._id}` : '/404'}
                                            id={user._id}
                                            onDelete={deleteUser}
                                        />
                                    </li>
                                </AccordionTable>
                            )
                        }
                    </AccordionItem>
                </div>
            }
        </>
    );
}

export default UsersSection;