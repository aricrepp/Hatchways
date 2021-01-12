import React from 'react';
import './Dashboard.css';

const Dashboard = ({apiData}) => {

    const findAverage = (e) => {
        console.log(e);
        const total = e.reduce((acc, curr) => {
            return parseInt(acc) + parseInt(curr)
        })
        return total / e.length;
    }


    if(apiData === null){
        return (
        <div>
            <h2>Loading Students...</h2>
        </div>
        )
    } else{
        return (
            <div className="dashboard">
                {apiData.map((item, index) => {
                    return (
                        <div key={index} className='student-container'>
                            <div className='student-image'>
                                <img src={item.pic} alt='profile pic'/>
                            </div>
                            <div className='student-content'>
                                <h2>{item.firstName} {item.lastName}</h2>
                                <div className='student-info'>
                                    <p>Email: {item.email}</p>
                                    <p>Company: {item.company}</p>
                                    <p>Skill: {item.skill}</p>
                                    <p>Average: {findAverage(item.grades)}%</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Dashboard;
