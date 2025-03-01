import './style.css';
import Header from "./components/header/heder";
import CategoriesList from './components/categories/categories-list';
import BlogsList from './components/blogs/blogs-list';
import Footer from './components/footer/footer';
import FactsList from './components/facts/fact-list';
import Search from './components/search/search';
import Slider from './components/slider/slider';
import { CategoryProps } from '@/interfaces/category.interface';
import { getAllCategories } from '@/services/category.service';
import { getFacts } from "@/services/fact.service";

export default async function Home() {
  const categories:CategoryProps[] = await getAllCategories();
  const factList = await getFacts(6);
  return (
    <div>
      <Header fixed={false}/>
      <main>

        <Slider />

        {/* search component */}
        <Search />

        {/* categories */}
        <CategoriesList categories={categories} minimumDisplay={8}/>

        <FactsList factList={factList} title="Treding facts" subTitle='' hideTitle={true}/>

        <BlogsList title="Deep dive into a blogs" subTitle='explore learn'/>
      </main>
      <Footer />
    </div>

  );
} 
