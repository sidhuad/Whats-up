import Auth from '../utils/auth';

const getMessages = async (roomId: string) => {
  try {
    // Send a POST request to '/auth/login' with user login information in JSON format
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Auth.getToken()}`
            },
      body: roomId
    });

    // Throw error if response status is not OK (200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response as JSON
      throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message    
    }

    // Parse the response body as JSON
    const data = await response.json();

    return data;  // Return the data received from the server
  } catch (err) {
    console.log('Error from user login: ', err);  // Log any errors that occur during fetch
    return Promise.reject('Could not fetch user info');  // Return a rejected promise with an error message
  }
}

export { getMessages };