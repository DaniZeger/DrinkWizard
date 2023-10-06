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
            onSubmit={onSubmit}
            onReset={onReset}
            className='form-layout'>
            {children}
        </form>
    );
}

export default FormLayout;