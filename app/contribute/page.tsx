import Footer from "../components/footer/footer";
import Header from "../components/header/heder";
import './style.css';
import Tabs from "./tab";
import { getAllCategories } from '@/services/category.service';
import { CategoryProps } from '@/interfaces/category.interface';

const Contribute = async () => {
  const categories:CategoryProps[] = await getAllCategories();
  return (
    <div>
      <Header fixed={true} />
      <main className="mt-16">
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <Tabs categories={categories}/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contribute;