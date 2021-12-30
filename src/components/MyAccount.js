import React from "react";
import { getUser } from '../api';
import { useState, useEffect } from "react";

/*AS A LOGGED-IN CUSTOMER, I WANT TO BE ABLE TO:
(see my order history so I can remember my previously purchased items and their prices at the time of purchase) -- need to have purchases set up first

view and edit my user profile so I can update my information when necessary.

Hide "My Account" when not logged in*/


const MyAccount = ({token}) => {

    const [myInfo, setMyInfo] = useState([]);

    const fetchMyUser = async (token, setMyInfo) => {
        try {
            const me = await getUser(token);
            setMyInfo([me]);
            

        } catch (error) {
            throw error;
        }
    }


    useEffect(() => {
        fetchMyUser(token, setMyInfo)
    }, [token]);

    return (
        <div className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
            <h2 className="card-title centered shadow"><b>Profile</b></h2>
            <div id="user-info" className="horizGroup">
                {myInfo.map((stuff, index) => {
                    return (
                        <div key={index}> 
                            <br />
                            <div className="form-group list-group-item-text">
                                <h1>Hey, {stuff.firstname}!</h1>
                            </div>
                            <div className="card w-90 p-3 border-dark m-3 shadow bg-body rounded">
                                <h2>Shipping address</h2>
                                    <div className="form-group list-group-item-text">
                                        {stuff.firstname } {stuff.lastname}
                                    </div>

                                    <div className="form-group list-group-item-text">
                                            {stuff.street}
                                    </div>

                                    <div className="form-group list-group-item-text">
                                            {stuff.city} {stuff.state}
                                    </div>
                                    
                                    <div className="form-group list-group-item-text">
                                                        {stuff.zip} 
                                    </div>

                                    <div className="m-1 form-group list-group-item-text">

                                        <button className="btn btn-primary m-1 w-30"
                                            onClick={async ()=> {
                                            alert('Edit button has been clicked')
                                        }}>
                                            Edit 
                                        </button>

                                        <button className="btn btn-primary m-1 w-30"
                                            onClick={async ()=> {
                                            alert('Delete button has been clicked')
                                        }}>
                                            Delete 
                                        </button>

                                    </div>

                                    <br />
                                    <div id="contact-info">
                                    {myInfo.map((stuff, index) => {
                                        return (
                                            <div key={index}>
                            
                                            <h2>Contact Info</h2>
                                            <div>
                                                <div className="form-group list-group-item-text">
                                                {stuff.phone}
                                                </div>
                                                    <div className="form-group list-group-item-text">
                                                        {stuff.email} 
                                                    </div>
                                            </div>

                                            <div className="m-1 form-group list-group-item-text">
                                                <button className="btn btn-primary m-1 w-30"
                                                    onClick={async ()=> {
                                                    alert('Edit button has been clicked')
                                                }}>
                                                    Edit 
                                                </button>
                        
                                                <button className="btn btn-primary m-1 w-30"
                                                    onClick={async ()=> {
                                                    alert('Delete button has been clicked')
                                                }}>
                                                    Delete 
                                                </button>
                            
                                            </div>
                               
                        </div>
                    )
                })}
            </div>
                                    
        </div>
                            
    </div>
        )
        })}
</div>
</div>
)
}

export default MyAccount;