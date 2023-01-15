import Header from "../components/Header"
import Footer from "../components/Footer"
import { useRouter } from "next/router"
import { format } from "date-fns";
import { searchResults } from './api/static'
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({searchResults}){

    
    const router = useRouter();
    const {location, startDate, endDate, numberOfGuest} = router.query;
    const formattedStartDate =  format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate =  format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`    
    return(
        <div>
            <Header placeholder={`${location} | ${range} | ${numberOfGuest}`}/>
            <main className="flex">
                <section className="flex-grow pt-14 px-16">
                    <p className="text-xs">300+ Stays - {range} - for {numberOfGuest} guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Bed</p>
                        <p className="button">More Filters</p>
                    </div>


                    {searchResults.map(item => (
                        <InfoCard 
                        img={item.img} 
                        location={item.location} 
                        star={item.location} 
                        price={item.price} 
                        description={item.description} 
                        total={item.total}
                        />
                    ))}
                </section>
                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <Map searchResults={searchResults}/>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Search


export async function getServerSideProps(){

    // const searchResults = await fetch("https://links.papareact.com/isz").then(res => res.json())
    
    return{
        props:{
            searchResults: searchResults,
        }
    }
}