import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";


export default function Navbar() {

  let {token , setToken} = useContext(TokenContext);
  console.log(token);
  let navigate = useNavigate()

  function logOut(){
     //remove token from local storage
  localStorage.removeItem("userToken");

  //remove token from context
  setToken(null);

  //navigate to login page
  navigate('/login');

  }

  

  return (
    <div className="w-[95%] shadow-lg mx-auto">
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-blue-800 font-bold text-2xl">Linkedin Posts</Link>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

       
          {token? <>
              <li><NavLink to='userPosts'>UserPosts</NavLink></li> 
          <li><NavLink to='/'>Home</NavLink></li> 
          </> : null}


          {token ? 
                  <li><a onClick={logOut}>Logout</a></li> :
                  <>
                  <li><NavLink to='login'>Login</NavLink></li>
                  <li><NavLink to='register'>Register</NavLink></li>
                  </>
          }
       
      
      </ul>
    </div>
  </div>
</div>
</div>
  )
}
