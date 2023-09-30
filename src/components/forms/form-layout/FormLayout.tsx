import { ReactNode, FormEventHandler } from "react";
import './FormLayout.scss'

interface FormLayoutProps {
    children: ReactNode,
    onSubmit: FormEventHandler<HTMLFormElement>,
    onReset: FormEventHandler<HTMLFormElement>
}

function FormLayout({ children, onSubmit, onReset }: FormLayoutProps) {
    return (
        <form
            // style={addDataForm}
            onSubmit={onSubmit}
            onReset={onReset}
            className='form-layout w-50 m-auto my-5 p-3'>
            {children}
        </form>
    );
}

export default FormLayout;