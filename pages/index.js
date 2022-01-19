import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CourseCard from '../components/cards/CourseCard';

const Index = ({ courses }) => {

    // const [courses, setCourses] = useState([])

    // useEffect(() => {
    //     fetchCourses()
    // }, [])

    // const fetchCourses = async () => {
    //     const { data } = await axios.get("/api/courses");
    //     setCourses(data)
    // }

    return (
        <>
            <h1 className="square jumbotron text-center bg-primary">Online Education Marketplace Nepal</h1>
            <div className="container-fluid">
                <div className="row">
                    {courses.map((course) => 
                        //console.log(course)
                        <div key={course._id} className="col-md-4">
                            {/**<pre>{JSON.stringify(course)}</pre>*/}
                            <CourseCard 
                                course={course}
                            />

                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/courses`)
    return {
        props: {
            courses: data
        }
    }
}

export default Index
