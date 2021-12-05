import axios from 'axios';
import { getAllProducts } from '../../db/product';

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// This function registers a new user
export const registerUser = async (setToken, username, password, verifyPassword, email, firstname, lastname, city, state, zipcode, phone) => {

  try {
    if (password !== verifyPassword) {
      alert("Passwords DO NOT match!!! 🤦‍♂️");
      return;
    }

    const response = await fetch('/api/users/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname,
        city: city,
        state: state,
        zipcode: zipcode,
        phone: phone
      })
    })
    const result = await response.json();
    console.log(result);
    const user = result.user;
    const token = result.token;
    console.log("New registered user is: ", user);
    setToken(token);
    localStorage.setItem("token", token);
    if (result.error) throw result.error;
    
  } 
  
  catch (error) {
    console.error("ERROR registering new user!!! 🤦‍♂️");
    throw error;
  }
}

// This function logs in a registered user
export const loginUser = async (username, password, setToken) => {

  try {
    const response = await fetch('/api/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

    const result = await response.json();
    console.log(result);
    console.log(result.token);
    const token = result.token;
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.getItem("token");
    if (result.error) throw result.error;
    
  } 
  
  catch (error) {
    console.error("ERROR logging in user!!! 🤦‍♂️");
    throw error;
  }
}

// This function will fetch all the products in the database from the BackEnd API
export const getAllProducts = () => {
  try {
    const response = await fetch('/api/products', {
      headers: {
        'Content-Type': 'application.json'
      },
    })

    const result = await response.json();

    if (result.error) throw result.error;
    console.log(result);
    return result;
    
  } 
  
  catch (error) {
    console.error('ERROR fetching all products!!! 🤦‍♂️');
    throw error;
  }
}

// test call to grab users info (token and to see if logged in)
export const getUser = async (token) => {
  try {
      const response = await fetch('/api/users/me', {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      const result = await response.json();
      console.log(chalk.cyan("Logged in user data: "), result);
      return result;
     
  }
  catch (error) {
      console.error("Trouble fetching current user data!!! 🤦‍♂️");
      throw error;
  }
}

// This function fetches a single product from the database by it's productId.
export const getProductById = async (productId) => {

  try {
      const response = await fetch(`/api/products/${productId}`, {
          headers: {
            'Content-Type': 'application.json',
          }
      })
      const result = await response.json();
      console.log("Single product by productId is: ", result);
      return result;
  } 
  
  catch (error) {
      console.error("ERROR getting product by productId!!! 🤦‍♂️");
      throw error;
  }
}

