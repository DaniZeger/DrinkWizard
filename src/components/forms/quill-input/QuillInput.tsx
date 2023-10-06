import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface QuillInputProps {
    content: string,
    setContent: Function
    error?: string
    className: string
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
    ],
};

function QuillInput({ content, setContent, error, className }: QuillInputProps) {
    return (
        <div className={className}>
            <label htmlFor="content" className="form-label">Content<span className="text-danger"> * </span>:</label>
            <ReactQuill
                modules={modules}
                style={{ height: '300px' }}
                id='content'
                placeholder="Enter the content"
                value={content}
                onChange={(val) => setContent(val)}
            />
            <small className="text-danger">{error}</small>
        </div>
    );
}

export default QuillInput;