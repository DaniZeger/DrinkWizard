import { useEffect, useState } from "react";
import { formatDate } from '../../helpers/Formatter';
import { defaultImageUrl } from "../../helpers/Validateion";
import { POST } from "../../types/PostType";
import MainHeader from "../../components/main-header/MainHeader";
import AddDataButton from "../../components/buttons/add-data-button/AddDataButton";
import PostCard from "./post-card/PostCard";
import { postsApi } from "../../api/postsApi";
import './BlogPage.scss'

const bgImage = 'https://www.morningadvertiser.co.uk/var/wrbm_gb_hospitality/storage/images/publications/hospitality/morningadvertiser.co.uk/drinks/spirits-cocktails/pubs-get-boost-from-millennials-drinking-spirits/3179613-1-eng-GB/Pubs-get-boost-from-millennials-drinking-spirits.jpg'

const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(0,0,0,1) 2%, rgba(0,0,0,0) 100%',
    bgPosition: 'center'
}

function BlogPage() {
    const [postsList, setPostsList] = useState<Array<POST>>([])

    useEffect(() => {
        postsApi.getPosts()
            .then(json => setPostsList(json))
    }, [])


    return (
        <>
            <MainHeader
                background={headerProps}
                title='Blog.'
            />
            <AddDataButton target="blog" action="Add Post" />
            <section className='blog-page'>
                {
                    postsList.map(post =>
                        <div className='blog-page__container'>
                            <PostCard
                                key={post._id}
                                title={post.title ? post.title.toUpperCase() : ''}
                                subtitle={post.subtitle ? post.subtitle : ''}
                                imageUrl={defaultImageUrl(post.imageUrl ? post.imageUrl : '')}
                                imageAlt={post.imageAlt ? post.imageAlt : 'No Image'}
                                date={post.created_at ? formatDate(post.created_at) : ''}
                                id={post._id ? post._id : ''}
                            />
                        </div>
                    )
                }
            </section>
        </>
    );
}

export default BlogPage;