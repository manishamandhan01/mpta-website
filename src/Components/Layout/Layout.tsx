import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";

export const Layout = ()=> {
    return(
        <>
            <div className="relative h-screen w-screen bg-cover bg-center"
                 style={{
                     backgroundImage: 'url("/public/sl_022321_41020_35.jpg")',
                 }}
            >
                <Header/>

            </div>
            <div>
                <Footer/>
            </div>
        </>
    );
}