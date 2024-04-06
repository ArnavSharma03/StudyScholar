// UTILITY FUNCTIONS
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"



// CUSTOM COMPONENTS
import Course_Card from "../components/core/Catalog/Course_Card";
import Course_Slider from "../components/core/Catalog/Course_Slider";
import Error from "./Error";



// BACKED API CONNECTOR COMPONENTS
import { apiConnector } from "../services/apiconnector";

// BACKEND API URL
import { categories } from "../services/apis";



// BACKEND APIS CALLS
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas";


const Catalog = () => {

    const { loading } = useSelector((state) => state.profile);
    const { catalogName } = useParams();
    const [active, setActive] = useState(1);
    const [categoryId, setCategoryId] = useState("");
    const [catalogPageData, setCatalogPageData] = useState(null);




    const getCategories = async() => {
        // API CALLS
        const response = await apiConnector("GET", categories.CATEGORIES_API);
        //console.log("response--->", response.data.data);
        const category_id = response?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        // once we get the category id than update current category_id
        setCategoryId( category_id );
    }




    // Fetch All categories
    useEffect( () => {
        getCategories();
    }, [catalogName]);





    const getCategoryDetails = async() => {
        try{
            const response = await getCatalogPageData( categoryId );
            // console.log("PRINTING RESPONSE-----> ", response);
            setCatalogPageData(response);
            //set is sheduletd ---> console.log("category page details", catalogPageData);
        }
        catch(error) {
            console.log(error);
        }
    }




    // This function will fetches all the details of selected category 
    useEffect(() => {
        if( categoryId ) {
            getCategoryDetails();
        }
    }, [categoryId]);




    // Used to get the updated data
    // useEffect(() => {
    //     console.log("category page details------> ", catalogPageData);
    // }, [catalogPageData]);




    return (
        <div className="text-white">
        
            {/* Hero Section */}
            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-richblack-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-25">
                            { catalogPageData?.data?.selectedCategory?.name }
                        </span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {catalogPageData?.data?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-richblack-200">
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>



            {/* Section-1 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Courses to get you started</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p className={`px-4 py-2 ${ active === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50" } cursor-pointer`} onClick={() => setActive(1)} > 
                        Most Popular 
                    </p>
                    <p className={`px-4 py-2 ${ active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"  } cursor-pointer`} onClick={() => setActive(2)} > 
                        New 
                    </p>
                </div>
                <div>
                    <Course_Slider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>
            </div>



            {/* Section 2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">
                    Top courses in {catalogPageData?.data?.differentCategory?.name}
                </div>
                <div className="py-8">
                    <Course_Slider Courses={catalogPageData?.data?.differentCategory?.courses} />
                </div>
            </div>



        {/* Section 3 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {
                        catalogPageData?.data?.mostSellingCourses ?.slice(0, 4).map((course, i) => (
                            <Course_Card course={course} key={i} Height={"h-[320px]"} />
                        ))
                    }
                </div>
            </div>
        </div>

    </div>
    )
}


export default Catalog;