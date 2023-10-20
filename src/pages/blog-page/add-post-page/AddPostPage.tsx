import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { userContext } from "../../../App"
import FormsButtons from "../../../components/forms/form-buttons/FormButtons"
import FormInput from "../../../components/forms/form-input/FormInput"
import FormLayout from "../../../components/forms/form-layout/FormLayout"
import { formsRequireValidate } from "../../../helpers/Validateion"
import { POST } from "../../../types/PostType"
import MainHeader from "../../../components/main-header/MainHeader"
import QuillInput from "../../../components/forms/quill-input/QuillInput"
import { postsApi } from "../../../api/postsApi"

const bgImage = 'https://img.freepik.com/free-photo/three-classic-margarita-drink-with-lime-salt-saucer-glasses-table_23-2148283653.jpg?w=1380&t=st=1690999580~exp=1691000180~hmac=2f232aa078581c045acc6db146a0ae6b5b68f554c52cbf910104c28aafe075ac'

export const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(255,255,255,1) 2%, rgba(255,255,255,0) 100%',
    bgPosition: 'center'
}

function AddPostPage() {
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

    const newPost: POST = {
        title: title,
        subtitle: subtitle,
        text: content,
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        author: context?.user && context.user.firstName && context.user.lastName ? context.user.firstName + context.user.lastName : ''
    }

    function onAdd(e: React.FormEvent<HTMLFormElement>): void {
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

        postsApi.addPost(newPost)
            .then(() => {
                toast.success('Post uploaded successfully', {
                    onClose: () => {
                        setTimeout(() => {
                            navigation('/blog')
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
                title="Add Post"
                background={headerProps}
            />

            <section>
                <FormLayout
                    onReset={onReset}
                    onSubmit={onAdd}
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
                            textAction='Add Post'
                            cancelTarget='/blog'
                        />
                    </div>
                </FormLayout>
            </section>

        </>
    );
}

export default AddPostPage;