import { useEffect, useState } from 'react';
import { USER } from '../../../types/UserType';
import { userApi } from '../../../api/userApi';

function UsersSection() {
    const [users, setUsers] = useState<USER[]>()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        userApi.getUsers()
            .then(json => setUsers(json))
    }, [])
    return (
        <>
        </>
    );
}

export default UsersSection;