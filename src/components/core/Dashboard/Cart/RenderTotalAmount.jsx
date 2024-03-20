import React from "react";
import { useSelector } from "react-redux";

// import IconBtn from "../../../Common/IconBtn";


const RenderTotalAmount = () => { 

    // importing values form slices [ total ruppess, and cart items ]
    const { total } = useSelector( (state) => state.auth );
    const { cart } = useSelector((state) => state.cart);


    function handleBuyCourse() {
        const courses = cart.map( (course) => course.id );
        console.log("Bought these course:", courses);
        // TODO: API Integrate -> payment gateway tak leke  jayegi
    }



    return (
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            
            {/* Total Heading  */}
            <p className="mb-1 text-sm font-medium text-richblack-300"> Total: </p>



            {/* Total Amount  */}
            <p className="mb-6 text-3xl font-medium text-yellow-100"> ₹ {total} </p>



            {/* Buy Button  */}
        </div>
    )
}


export default RenderTotalAmount;