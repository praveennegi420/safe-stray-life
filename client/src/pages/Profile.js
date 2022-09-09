import { useState, useEffect } from 'react'
import axios from 'axios'
import Stray from '../components/Stray'
import '../styles/Profile.css'
import { useNavigate } from 'react-router-dom'
import App from '../App'

export default function Profile() {
    const navigate= useNavigate()
    const [data, setData] = useState({ data:{  }, posts:[] }) 

    useEffect(() => {
        axios.post('http://localhost:8000/getprofile', {
            token: localStorage.getItem('token')
        })
            .then(res => { 
                 setData(res.data)
                 })
            .catch(err => {
                console.log(err) 
            }) 
             
    }, [])

    const removeImage = (id) =>{
        axios.post('http://localhost:8000/deletepost',{ id, user: data.data._id })
        .then(res => window.location.reload())
        .catch(err => console.log(err))


    }

    let id=0;
    const displayData= data.posts.map(datauni => {
        let base64= btoa([].reduce.call(new Uint8Array(datauni.img.data.data),function(p,c){return p+String.fromCharCode(c)},''))
        return <Stray id={datauni._id} key={datauni._id} imgsrc={base64} location={datauni.location} contact={datauni.contact} delete={1} handleClick={removeImage}/> 
    })
 

    const postsDisplay = () => {
        return ( <h3>NO</h3> )
    }

    const logOut = () => {
        localStorage.setItem('token','')
        navigate('/')
        window.location.reload()
    }

    return(
        <div className='profile'>
            <div className='profile-box'>
                <img className='profile-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP-i5liksKo3g85Qz90jpYieJ4J_YGy5S7JQ&usqp=CAU' alt='profile-pic'/>
                <div className='profile-info'>
                    <div className='profile-details'> <h3>Name -</h3> <h4>{data.data.name}</h4> </div>
                    <div className='profile-details'> <h3>Email -</h3> <h4>{data.data.email}</h4> </div>
                    <div className='profile-details'> <h3>Address -</h3> <h4>{data.data.address}</h4> </div>                    
                    <div className='profile-details'> <h3>Gender -</h3> <h4>{data.data.gender}</h4> </div>
                    <div className='profile-details'> <h3>D.O.B -</h3> <h4>{data.data.dob}</h4> </div>
                    {/* <div className='profile-details'> <h3>Work -</h3> <h4>{data.user}</h4> </div> */}
                    <div className='profile-details'> <h3>About -</h3> <h4>{data.data.about}</h4> </div>
                </div>
            </div>
            <button className='edit-profile'>Edit Profile</button>
            <div className='break'></div>
            <div className='profile-posts'>
                <h2>Recent Posts</h2>

                <div className='all-posts'>
                { data.posts && Object.keys(data.posts).length===0 ? <h4 className='post-msg'>No Posts Uploaded</h4> : displayData}
                </div>
            </div>
            <div className='break dwnone'></div>
            <button className='log-out' onClick={logOut}>Log Out</button>
        </div>
    )
}