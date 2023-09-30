import './MainHeader.scss'

interface MainHeaderProps {
    title: string,
    background: {
        image: string,
        colorOverly: string,
        bgPosition: string
    }
}

function MainHeader({ title, background }: MainHeaderProps) {

    const backgroundProps = {
        backgroundPosition: background.bgPosition,
        backgroundImage: `linear-gradient(0deg, ${background.colorOverly}), url(${background.image}`,
    }

    return (
        <header
            className="main-header"
            style={backgroundProps}>
            <div className='main-header__container'>
                <div className='main-header__title-container'>
                    <h1 className='main-header__title'>
                        {title}
                    </h1>
                </div>
            </div>

        </header>
    );
}

export default MainHeader;