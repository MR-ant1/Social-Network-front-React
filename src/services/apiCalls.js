
const root = "http://localhost:4001/api/"

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
