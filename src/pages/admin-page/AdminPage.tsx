import MainHeader from "../../components/main-header/MainHeader";
import PostsSection from "./posts-section/PostsSections";
import './AdminPage.scss'
import CocktailsSection from "./cocktails-section/CocktailsSection";
import BarSection from "./bars-section/BarsSection";

export interface Collections {
    name: string,
    isOpen: boolean
}

const bgImage = "https://img.freepik.com/free-photo/barista-reading-inventory-list-while-working-bar-counter_637285-3390.jpg?w=1380&t=st=1696689133~exp=1696689733~hmac=f19c856543df0de2392113416b69f918f0770e13a407b63330277171f10796f0"

const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(0,0,0,1) 2%, rgba(0,0,0,0) 100%',
    bgPosition: 'bottom center'
}

function AdminPage() {

    return (
        <>
            <MainHeader
                background={headerProps}
                title="Admin"
            />

            <div className="admin-page">
                <div className="admin-page__container">
                    <ul className="admin-page__header">
                        <li style={{ width: '5%' }}>#</li>
                        <li style={{ width: '40%' }}>Collection Name</li>
                        <li style={{ width: '40%' }}>Data Length</li>
                        <li style={{ width: '15%', textAlign: 'right' }}>Add Data</li>
                    </ul>
                    <div className="admin-page__accordion">
                        <PostsSection />
                        <CocktailsSection />
                        <BarSection />
                    </div>

                </div>
            </div>

        </>
    );
}

export default AdminPage;