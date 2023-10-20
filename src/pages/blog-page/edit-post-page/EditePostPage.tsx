import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { userContext } from "../../../App"
import FormsButtons from "../../../components/forms/form-buttons/FormButtons"
import FormInput from "../../../components/forms/form-input/FormInput"
import FormLayout from "../../../components/forms/form-layout/FormLayout"
import QuillInput from "../../../components/forms/quill-input/QuillInput"
import MainHeader from "../../../components/main-header/MainHeader"
import { formsRequireValidate } from "../../../helpers/Validateion"
import { POST } from "../../../types/PostType"
import { headerProps } from "../add-post-page/AddPostPage"
import { postsApi } from "../../../api/postsApi"

function EditPostPage() {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString()
    const { id } = useParams()
    const [post, setPost] = useState<POST>()
    const context = useContext(userContext)
    const navigation = useNavigate()
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imageAlt, setImageAlt] = useState('')
    const [content, setContent] = useState('')
    const [contentError, setContentError] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (!id) return
        postsApi.getPostById(id)
            .then(json => {
                setPost(json)
            })
            .catch(err => {
                console.log(err.message);
                if (err.response && err.response.status > 399) {
                    navigation('/404')
                }
            })
    }, [])

    useEffect(() => {
        setTitle(post?.title as string)
        setSubtitle(post?.subtitle as string)
        setContent(post?.text as string)
        setImageUrl(post?.imageUrl as string)
        setImageAlt(post?.imageAlt as string)
    }, [post])

    const newPost: POST = {
        title: title,
        subtitle: subtitle,
        text: content,
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        updated_at: currentDate
    }

    function onEdit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        if (!formsRequireValidate(title)) {
            setTitleError('Title is require')
            return
        }
        if (!formsRequireValidate(content)) {
            setContentError('Content is require')
            return
        }

        setTitleError('')
        setContentError('')

        if (!id) return
        postsApi.editPost(id, newPost)
            .then(() => {
                toast.success('Post updated successfully', {
                    onClose: () => {
                        setTimeout(() => {
                            navigation(`/post/${id}`)
                        }, 3000)
                    }
                })
            })
            .catch((err) => {
                setMessage(err.message)
                toast.error(message)
                return
            })
    }

    function onReset() {
        setTitle('')
        setSubtitle('')
        setImageUrl('')
        setImageAlt('')
        setContent('')
    }
    return (
        <>
            <MainHeader
                title="Edit Post"
                background={headerProps}
            />

            <section>
                <FormLayout
                    onReset={onReset}
                    onSubmit={onEdit}
                >
                    <FormInput
                        width='100%'
                        color='black'
                        label='title'
                        labelTitle='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeHolder='title'
                        error={titleError}
                        require
                    />
                    <FormInput
                        width='100%'
                        color='black'
                        label='subtitle'
                        labelTitle='Subtitle'
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeHolder='Subtitle'
                    />
                    <FormInput
                        width='100%'
                        color='black'
                        label='imageUrl'
                        labelTitle='Header image url'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeHolder='Header image url'
                    />
                    <FormInput
                        width='100%'
                        color='black'
                        label='imageAlt'
                        labelTitle='Header image alt'
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        placeHolder='Header image alt'
                    />
                    <QuillInput
                        className="mb-3"
                        content={content}
                        setContent={setContent}
                        error={contentError}
                    />
                    <div style={{ marginTop: '60px' }}>
                        <FormsButtons
                            textAction='Update Post'
                            cancelTarget='/blog'
                        />
                    </div>
                </FormLayout>
            </section>

        </>
    );
}

export default EditPostPage;