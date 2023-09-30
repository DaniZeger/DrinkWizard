import { useEffect, useState } from "react";
import './ScrollButton.scss'

type VISIBLE = '__visible' | '__invisible'

function ScrollButton() {
    const [visible, setVisible] = useState(false)
    const [className, setClassName] = useState<VISIBLE>('__invisible')

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (visible) {
            setClassName('__visible')
        } else {
            setClassName('__invisible')
        }
    }, [visible])

    window.addEventListener('scroll', toggleVisible);
    return (
        <button
            className={`scroll-button scroll-button${className}`}
            onClick={scrollToTop}
        >
            <i className="bi bi-arrow-up-circle-fill"></i>
        </button>
    );
}

export default ScrollButton;