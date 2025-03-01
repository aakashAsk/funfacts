import FactsList from "../components/facts/fact-list";
import Footer from "../components/footer/footer";
import Header from "../components/header/heder";
import Search from "../components/search/search";
import Slider from "../components/slider/slider";
import { getFacts } from "@/services/fact.service";

export default async function Facts() {

    const factList = await getFacts();
    
    return (
        <div>
            <Header fixed={false}/>
            <main>
                <Slider />
                {/* search component */}
                <Search />
                
                <FactsList title="" subTitle="" hideTitle={false} factList={factList}/>
                
            </main>
            <Footer />
        </div>
    )
}