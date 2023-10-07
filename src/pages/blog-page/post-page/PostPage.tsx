import { useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { userContext } from "../../../App"
import { getDaysAgo, formatDate, renderHTMLContent } from "../../../helpers/Formatter"
import useWindowWidth from "../../../hooks/useWindowWidth"
import { POST } from "../../../types/PostType"
import LikeButtons from "../../../components/buttons/like-button/LikeButtons"
import { postsApi } from "../../../api/postsApi"
import { likesApi } from "../../../api/likesApi"
import EditDataButtons from "../../../components/buttons/edit-data-buttons/EditDataButtons"
import './PostPage.scss'
import { useDefaultImageUrl } from "../../../hooks/useDefaultImage"

function PostPage() {
    const navigation = useNavigate()
    const context = useContext(userContext)
    const { id } = useParams()
    const [post, setPost] = useState<POST>()
    const width = useWindowWidth()
    const lastUpdated = getDaysAgo(post?.updated_at)
    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)
    const { getDefaultImageUrl, setCustomImageUrl } = useDefaultImageUrl();

    function handleIsLiked(): boolean {
        if (context?.user && context?.user?.liked_posts) {
            Array.isArray(context?.user?.liked_posts._id) && context?.user?.liked_posts._id.some((likedPost) => likedPost._id === id);

            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (!id) return
        postsApi.getPostById(id)
            .then(json => {
                setPost(json)
                setIsLike(handleIsLiked())
                setCustomImageUrl(json.imageUrl as string)
            })
            .catch(err => {
                console.log(err.message);
                if (err.response && err.response.status > 399) {
                    navigation('/404')
                }
            })
    }, [])

    function onLike() {
        if (!isLike) {
            if (post?.likes === undefined || post.dislikes === undefined || !id) return
            postsApi.likeDislike(
                id,
                post?.likes && post.likes > 0 ? post.likes + 1 : 1,
                post?.dislikes)
                .then((json) => {
                    setPost(json)
                    if (!context?.user?._id) return
                    likesApi.likePost(context?.user._id, id)
                        .then(() => {
                            setIsLike(true)

                        })
                })
        } else {
            if (post?.likes === undefined || post.dislikes === undefined || !id) return
            postsApi.likeDislike(
                id,
                post?.likes && post.likes > 0 ? post.likes - 1 : 0,
                post?.dislikes)
                .then(json => {
                    setPost(json)
                    if (!context?.user?._id) return
                    likesApi.unlikePost(context?.user._id, id)
                        .then(() => {
                            setIsLike(false)

                        })
                })
        }
    }

    function onDislike() {
        if (!isDislike) {
            if (post?.likes === undefined || post.dislikes === undefined || !id) return
            postsApi.likeDislike(
                id,
                post?.likes,
                post?.dislikes && post.dislikes > 0 ? post.dislikes + 1 : 1)
                .then((json) => {
                    setIsDislike(true)
                    setPost(json)
                })
        } else {
            if (post?.likes === undefined || post.dislikes === undefined || !id) return
            postsApi.likeDislike(
                id,
                post?.likes,
                post?.dislikes && post.dislikes > 0 ? post.dislikes - 1 : 0)
                .then(json => {
                    setIsDislike(false)
                    setPost(json)
                })
        }
    }

    function onDelete(id: string) {
        postsApi.deletePost(id)
            .then(() => {
                toast.success('Post data deleted successfully', {
                    onClose: () => {
                        setTimeout(() => {
                            navigation(`/blog`)
                        }, 3000)
                    }
                })
            })
            .catch((err) => {
                toast.error(err.message)
                return
            })
    }


    return (
        <div className="post-page">
            <header className="post-page__header">
                <div>
                    <h1 className="post-page__header__title">{post?.title?.toUpperCase()}</h1>
                    <h4>{post?.subtitle}</h4>
                    <p className="post-page__header__text">
                        By {post?.author} | {formatDate(post?.created_at)} | Last updated {lastUpdated} days ago
                    </p>
                    <LikeButtons
                        likesCount={post?.likes ? post?.likes : 0}
                        dislikesCount={post?.dislikes ? post.dislikes : 0}
                        handleDislike={onDislike}
                        handleLike={onLike}
                        isLike={isLike}
                        isDislike={isDislike}

                    />
                </div>
                {
                    width > 700 &&
                    <div className="post-page__header__image">
                        <img width={width > 900 ? 450 : 250} src={getDefaultImageUrl()} alt={post?.imageAlt} />
                    </div>
                }
                <EditDataButtons
                    onDelete={onDelete}
                    id={id}
                    data="post"
                    target={post?._id ? `post/${post._id}` : '/404'}
                />
            </header >
            <section
                className="post-page__post"
                dangerouslySetInnerHTML={{ __html: renderHTMLContent(post?.text as string) }}
            />

        </div >
    );
}

export default PostPage;