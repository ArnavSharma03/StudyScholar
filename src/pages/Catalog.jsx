import React from "react";


const Catalog = () => {
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


            {/* Section-1, Section-2, Section-3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Courses to get you started</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p> Most Popular </p>
                    <p> New </p>
                </div>
            </div>





        </div>
    )
}


export default Catalog;