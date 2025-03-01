import './style.css';

export default function Search() {
    return (
        <div className="main-heading flex flex-wrap justify-center mt-10">
          <form method="GET" action="" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="bg-white border-2  shadow p-2 relative rounded-xl flex w-full">
              <span className="w-auto flex justify-end  items-center text-gray-500 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input name="episodequery" id="title" className="border-white outline-none border-0 w-full rounded-xl p-2" type="text" placeholder="Find interesting facts..." />
              <button type="submit" className="search-btn hover:bg-gray-700 rounded-xl text-white text-xl p-2 pl-4 pr-4 ml-2">
                <p className="font-semibold text-xs">Search</p>
              </button>
            </div>
          </form>
        </div>
    )
}