// import utility Methods
import React from "react";
import { useSelector } from "react-redux";



// Extra Component Used in this package
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";


const Cart = () => {



    const { total, totalItems } = useSelector( (state) => state.auth );

    return (
        <div>


            { /* Cart Heading */ }
            <h1 className="mb-14 text-3xl font-medium text-richblack-5"> Your Cart </h1>



            { /* Total Items in cart */ }
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">  
                { totalItems } Courses in Cart
            </p>



            {/* Render total amount component  */}
            { total > 0 ? (
                <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>
            ) : (
                <p className="mt-14 text-center text-3xl text-richblack-100">
                    Your cart is empty
                </p>
            )}



        </div>
    )
}



export default Cart;