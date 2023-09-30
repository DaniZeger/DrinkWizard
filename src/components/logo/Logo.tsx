import horizontal from '../../img/logo/logoHorizontal.png'
import vertical from '../../img/logo/logoVertical.png'

interface Props {
    height: string
    layout: 'horizontal' | 'vertical'
}

function Logo({ height, layout }: Props) {
    return (
        <div>
            <img height={height} src={layout === 'horizontal' ? horizontal : vertical} alt="logo" />
        </div>
    );
}

export default Logo;