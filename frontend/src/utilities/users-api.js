import React from 'react';
import axios from 'axios';

export async function getUser() {
  try {
    const userResponse = await axios.get("/api/get_user");
    const loggedInUser = userResponse.data;
    // console.log(userResponse, loggedInUser)
    if (loggedInUser) {
      return loggedInUser;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function signUp() {
  axios
    .post('/api/signup/')
    .then((res) => {
      console.log(res.data)
      window.location.reload();
    }
  )
}

export function logoutUser(e) {
  e.preventDefault();
  axios
    .post('/api/logout/', null, { withCredentials: true })
    .then((res) => {
      console.log(res.data)
      window.location.reload();
    })
}

// function getCookieValue() {
//   var name = "csrftoken"
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(';');
//   console.log(ca)
//   for(var i = 0; i < ca.length; i++) {
//       var c = ca[i];
//       console.log(c)
//       while (c.charAt(0) === ' ') {
//           c = c.substring(1);
//       }
//       if (c.indexOf(name) === 0) {
//           console.log(c.substring(name.length, c.length))
//           return c.substring(name.length, c.length);
//       }
//   }
//   return "";
// }

// export async function signUp(email, password) {
//   try {
//     const Token = getCookieValue('csrftoken')
//     axios.defaults.headers.post['X-CSRFToken'] = Token;
//     const signUpResponse = await axios.post('/api/users/', {
//       email,
//       password,
//       });
//     const newUser = signUpResponse.data;
//     console.log(newUser, signUpResponse)
//     if (newUser) {
//       console.log(newUser)
//       return newUser;
//     } else {
//       console.log('Sign up failed before the catch error')
//       return null;
//     }
//   } catch (error) {
//     console.log('Sign up failed after the catch', error)
//   }
// }




