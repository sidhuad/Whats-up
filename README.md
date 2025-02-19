# What's UP


## Description
What's UP is a real-time messaging application designed to provide users with a seamless and interactive chat experience. Built using Node.js, Express.js, React, PostgreSQL with Sequelize, and Socket.io, WhatsUP allows users to send and receive messages instantly in a shared chatroom. The application also features JWT authentication for secure user access.


## Badge
None.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Test Instructions](#testinstructions)
- [Questions](#questions)
   

## Installation 
1. Clone the Repository:

```
git clone <respository-SSH key>

```

2. Navigate to the project directory:

```
cd whatsup
```

3. Install the necessary dependencies on the frontend and backend :

```
cd server
npm install

cd client
npm install
```

4. Set Up Environment Variables:

```
DATABASE_URL=your_postgresql_database_url  
JWT_SECRET=your_jwt_secret  
SOCKET_PORT=your_socket_io_port  
```

5. Start the development server:

```
npm run dev
```

Your portfolio should now be running locally at ```http://localhost:3000```.


## Usage 

● Sign up or log in using your credentials.

● Enter the chat with a friend and send real-time messages.

● Engage in conversations with other users instantly.


## License 
This project is licensed under ...... 


## Contributing 
Contributions are welcome! To contribute:
1. Fork the repository.

2. Create a new branch:
```
git checkout -b feature/yourFeature
```

3. Commit your changes:
```

git commit -m "Add new feature"
```

4. Push to your branch:
```

git push origin feature/yourFeature
```

5. Open a pull request for review.


## Test Instructions 
To test the application's functionality:

1. Ensure the application is running: 
    
    Make sure both the frontend and backend servers are running. If not, start them as follows:

~~~
cd server
npm start

cd client
npm start

~~~

2. Run the application: 

```
npm run start:dev
```

3. Access the website

    Open your web browser and go to http://localhost:3000 (or the appropriate URL if deployed) to access the WhatsUP application.

4. Test Features

    Check that all of the following features work correctly:
    
    User Authentication: Test the login and sign-up functionality. Ensure users can register, log in, and log out without issues. Verify that JWT tokens are stored securely.
    
    Real-Time Messaging: Test the real-time chat feature. Send messages and verify that they appear instantly for both you and the recipient. Test message delivery even with multiple users.
    
    User Interface: Ensure that the UI is responsive, intuitive, and matches the wireframes/designs. Check that the chat interface is functional and easy to navigate. 
    
    Error Handling: Simulate errors such as entering invalid credentials, sending empty messages, or refreshing the page. Confirm that appropriate error messages are shown, and the system responds gracefully.


## Questions 
If there are any additional questions that we can answer for you, reach out to us at ...

