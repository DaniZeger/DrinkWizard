import { useEffect, useState } from 'react';
import { postsApi } from '../../../api/postsApi';
import EditDataButtons from '../../../components/buttons/edit-data-buttons/EditDataButtons';
import VisitPageButton from '../../../components/buttons/visit-page-button/VisitPageButton';
import { formatDate } from '../../../helpers/Formatter';
import { POST } from '../../../types/PostType';
import AccordionItem from '../accordion-item/AccordionItem';
import AccordionTable from '../accordion-item/AccordionTable';
import ItemHeader from '../accordion-item/ItemHeader';
import AccordionHeader from '../accordion-header/AccordionHeader';

function PostsSection() {
    const [posts, setPosts] = useState<POST[]>()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        postsApi.getPosts()
            .then(json => setPosts(json))
    }, [])

    function deletePost(id: string) {
        postsApi.deletePost(id)
            .then(() =>
                postsApi.getPosts()
                    .then(json => setPosts(json))
            )
    }

    return (
        <>
            <AccordionHeader
                collectionName='Posts'
                collectionLength={posts ? posts.length : 0}
                handleOpen={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
            />
            {
                isOpen &&
                <div className="post-section">
                    <ItemHeader>
                        <li style={{ width: '3%' }}>#</li>
                        <li style={{ width: '27%' }}>Title</li>
                        <li style={{ width: '10%' }}>Likes</li>
                        <li style={{ width: '10%' }}>Dislikes</li>
                        <li style={{ width: '12.5%' }}>Author</li>
                        <li style={{ width: '12.5%' }}>Created at</li>
                        <li style={{ width: '12.5%' }}>Updated at</li>
                        <li style={{ width: '12.5%', textAlign: 'center' }}>Actions</li>
                    </ItemHeader>
                    <AccordionItem>
                        {
                            posts &&
                            posts.map((post, index) =>
                                <AccordionTable>
                                    <li style={{ width: '3%' }}>{index + 1}</li>
                                    <li style={{ width: '27%' }}>
                                        {post.title}
                                        <VisitPageButton
                                            id={post._id ? post._id : ''}
                                            target='post'
                                        />
                                    </li>
                                    <li style={{ width: '10%' }}>{post.likes}</li>
                                    <li style={{ width: '10%' }}>{post.dislikes}</li>
                                    <li style={{ width: '12.5%' }}>{post.author}</li>
                                    <li style={{ width: '12.5%' }}>{formatDate(post?.created_at)}</li>
                                    <li style={{ width: '12.5' }}>{formatDate(post?.updated_at)}</li>
                                    <li style={{ width: '12.5%', textAlign: 'center' }}>
                                        <EditDataButtons
                                            isAdminPage
                                            data='post'
                                            target={post?._id ? `post/${post._id}` : '/404'}
                                            id={post._id}
                                            onDelete={deletePost}
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

export default PostsSection;