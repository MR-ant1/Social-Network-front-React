
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