import React, {useState} from 'react';
import './Dashboard.css';

const Dashboard = ({apiData}) => {

    const [filter, setFilter] = useState('');
    const [tagSearch, setTagSearch] = useState('');
    const [form, setForm] = useState('')


    const findAverage = (e) => {
        const total = e.reduce((acc, curr) => {
            return parseInt(acc) + parseInt(curr)
        })
        return total / e.length;
    }

    const handleName = (e) => {
        e.preventDefault();
        setFilter(e.target.value.toLowerCase())
    }

    const handleTagSearch = (e) => {
        e.preventDefault();
        setTagSearch(e.target.value.toLowerCase())
    }

    const handleTagAdd = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        
    }


    const handleTagSubmit = (e, item) => {
        e.preventDefault();
        const content = document.getElementById(item.id)

        if(item.id === content.id ){
            item.tags.push(form)
            setForm('');
        } 
        
    }

    const handleExpand = (e, item) => {
        e.preventDefault();
        if(e.target.innerText === '+'){
            e.target.innerText = '-'
        } else{
            e.target.innerText = '+'
        }
        
        const content = document.getElementById(item.id)
        if(item.id === content.id && content.classList.contains('tests-active')){
            content.classList.remove('tests-active')
        } else if(item.id === content.id && content.classList.contains('tests-hidden')){
            content.classList.add('tests-active')
        }
        
    }
    

    if(apiData === null){
        return (
        <div className="dashboard">
            <h2>Loading Students...</h2>
        </div>
        )
    } else{

        const getFilter = () => {
                const filtered = apiData.filter(item => {
                    const findTag = item.tags.map(tag => {
                        if(item.tags.includes(tagSearch)){
                            return item
                        }
                        return null
                    })
                if(filter === '' ){
                    return item
                }else if((item.firstName.toLowerCase().includes(filter) || item.lastName.toLowerCase().includes(filter)) && item === findTag){
                    return item
                }else if((item.firstName.toLowerCase().includes(filter) || item.lastName.toLowerCase().includes(filter))){
                    return item
                }
                return null
            })
            return filtered
        }

        return (
            <div className="dashboard">
                <div className='student-inputs'>
                    <input placeholder='Search Name' onChange={handleName}></input>
                    <input placeholder='Search Tag' onChange={handleTagSearch}></input>
                </div>
                { getFilter().map((item, index) => {
                    return (<>
                        <div key={index} className='student-container'>
                            <div className='student-image'>
                                <img src={item.pic} alt='profile pic'/>
                            </div>
                            <div className='student-content'>
                                <h2>{item.firstName} {item.lastName}</h2>
                                <div className='student-info' >
                                    <p>Email: {item.email}</p>
                                    <p>Company: {item.company}</p>
                                    <p>Skill: {item.skill}</p>
                                    <p>Average: {findAverage(item.grades)}%</p>
                                    <div className='tests-hidden' id={item.id}>
                                        {item.grades.map((test, index) => {
                                            return (
                                                <p key={index}>Test {index}: {test}%</p>
                                            )
                                        })}
                                    </div>
                                    <div className="student-tag">
                                        {item.tags.length > 0 ? item.tags.map((item, index) => {
                                        return <div className='student-tag-pill' key={index}>{item.tag}</div>
                                    }) : <div></div>}
                                    </div>
                                    
                                    <form key={index} onSubmit={e => handleTagSubmit(e,item)}>
                                        <input className='student-tag-search' placeholder='Add Tag' name='tag' onChange={handleTagAdd} ></input>
                                    </form>
                                </div>
                            </div>
                            <div className='expand' onClick={e => handleExpand(e,item)}>
                                +
                            </div>
                            
                        </div>
                    </>)
                })}
            </div>
        );
    }
}

export default Dashboard;
