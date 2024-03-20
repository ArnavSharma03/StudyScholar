// import utility Methods
import React from "react";
import { useDispatch, useSelector } from "react-redux";


// import React Icons
import ReactStars from "react-rating-stars-component"
import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"


// import slices method
import { removeFromCart } from "../../../../slices/cartSlice";




const RenderCartCourses = () => { 


    // get courses from cart i.e stored in slices
    const { cart } = useSelector( (sate) => sate.cart );
    
    const dispatch = useDispatch();


    return (
        <div>
            {
                cart.map( (course, index) => {
                    <div key={course._id}>



                        { /* Left Section */}
                        <div>
                            < img src= { course?.thumbnail } />


                            {/* Course Name and rating  div*/}
                            <div>
                                <p> { course?.courseName } </p>
                                <p> {course?.category?.name } </p>
                                <div> 
                                    <span> 4.5 </span> 
                                    <ReactStars count={5} size={20} edit={false} activeColor="#ffd700" emptyIcon={<FaStar />} fullIcon={<FaStar />} />
                                </div>
                                <span> { course?.ratingAndReview?.length} Ratings </span>
                            </div>
                        </div>



                        { /* Right Section */}
                        <div>
                            <button onClick={ () => dispatch( removeFromCart(course._id) ) }>
                                <RiDeleteBin6Line />
                                <span> Remove </span>
                            </button>
                        </div>



                        {/* Course Price */}
                        <p> { course?.price } </p>
                    </div>
                })
            }
        </div>
    )
}


export default RenderCartCourses;   