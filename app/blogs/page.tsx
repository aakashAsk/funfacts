import BlogsList from "../components/blogs/blogs-list";
import Footer from "../components/footer/footer";
import Header from "../components/header/heder";
import Search from "../components/search/search";

export default function Facts() {
    return (
        <div>
            <Header />
            <main>
                {/* search component */}
                <Search />
                
               <BlogsList title="" subTitle=""/>

        
               
            </main>
            <Footer />
        </div>
    )
}