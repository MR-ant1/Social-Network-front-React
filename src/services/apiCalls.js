
const root = "https://api-postit.up.railway.app/api/"
import { logout } from "../app/slices/userSlice";

export const loginCall = async (user) => {

  const clientData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  };

  try {
    const response = await fetch(`${root}auth/login`, clientData);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    if(data.message === "Cant authentificate user") {
      dispatchEvent(logout({ tokenData: ""}))
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const registerCall = async (user) => {

  const clientData = {
      method: "POST",                    
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user)          
  };
  try {

      const response = await fetch(`${root}auth/register`, clientData)    //variable response with saved data from fetching info to endpoint route

      const data = await response.json()

      if (!data.success) {
          throw new Error(data.message)
      }

      return data

  } catch (error) {
      return error;
  }
}

export const GetPosts = async (token) => {
  const clientData = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`          //adding token in authorization to pass the auth middleware in backend
      }
  }

  try {
      const response = await fetch(`${root}posts`, clientData)

      const data = await response.json();

      if (!data.success) {
          throw new Error(data.message)
      }

      return data

  } catch (error) {
      return error
  }
}

export const GetProfile = async (token) => {
  const clientData = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`          //adding token in authorization to pass the auth middleware in backend
      }
  }
  
  try {
      const response = await fetch(`${root}users/profile`, clientData)
    
      const data = await response.json();

      if (!data.success) {
          throw new Error(data.message)
      }

      return data

  } catch (error) {
      return error
  }
}

export const UpdateCall = async (token, user) => {
  const clientData = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`          //adding token in authorization to pass the auth middleware in backend
      },
      body: JSON.stringify(user)
  }

  try {
      const response = await fetch(`${root}users/profile`, clientData)

      const data = await response.json();

      if (!data.success) {
          throw new Error(data.message)
      }

      return data

  } catch (error) {
      return error
  }
}

export const createPostCall = async (token, story) => {

  const clientData = {
      method: "POST",                    
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(story)          
  };
  try {

      const response = await fetch(`${root}posts`, clientData)    

      const data = await response.json()

      if (!data.success) {
          throw new Error(data.message)
      }

      return data

  } catch (error) {
      return error;
  }
}

export const GetMyPosts = async (token) => {
  const clientData = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`          //adding token in authorization to pass the auth middleware in backend
      }
  }

  try {
      const response = await fetch(`${root}posts/own`, clientData)

      const data = await response.json();

      if (!data.success) {
          throw new Error(data.message)
      }

      return data

  } catch (error) {
      return error
  }
}

export const deletePostCall = async (id, token) => {
  const clientData = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`          
      }
  }

  try {
      const response = await fetch(`${root}posts/${id}`, clientData)

      const data = await response.json();

      if (!data.success) {
          throw new Error(data.message)
      }

      return data

  } catch (error) {
      return error
  }
}

export const likeCall = async (token, postId) => {
  const clientData = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",  
          "Authorization": `Bearer ${token}`        
      }
  }

  try {
      const response = await fetch(`${root}posts/like/${postId}`, clientData)

      const data = await response.json();

      if (!data.success) {
          throw new Error(data.message)
      }

      return data

  } catch (error) {
      return error
  }
}

export const usersCall = async (token) => {
  const clientData = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
  }
  
  try {
      const response = await fetch(`${root}users`, clientData)

      const data = await response.json();

      if (!data.success) {
          throw new Error(data.message)
      }
      return data

  } catch (error) {
      return error
  }
}

export const UpdatePostCall = async (token, post) => {
    const clientData = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`       
        },
        body: JSON.stringify(post)
    }
  
    try {
        const response = await fetch(`${root}posts`, clientData)
  
        const data = await response.json();
  
        if (!data.success) {
            throw new Error(data.message)
        }
  
        return data
  
    } catch (error) {
        return error
    }
  }
  