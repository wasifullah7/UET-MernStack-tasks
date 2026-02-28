Week 2 Task – MERN Stack

User Authentication (Signup & Login)

Concepts:
React: Forms, useEffect, React Router
Node.js: JWT, Bcrypt
MongoDB: User Schema, Password Hashing
________________________________________
Task:
User Signup/Login System (Frontend + Backend + DB)
•	React:
• Create Signup and Login pages using forms.
• On successful login, store the JWT token in localStorage.
• Use useEffect to check if user is already logged in (token exists).
•	Node.js (Express):
• register and login API endpoints.
• Use bcrypt to hash passwords before storing.
• On login, validate the user and return a JWT token.
•	MongoDB:
• Create a User Schema with fields: { name, email, password }.
• Store passwords in hashed form using bcrypt.
________________________________________
Flow of Task:
1.	A user visits the Signup page, fills the form { name, email, password }, and submits.
2.	The data is sent to the register API → password is hashed → user is saved in the DB.
3.	The user can then go to the Login page, enter their email and password.
4.	The login API checks credentials, returns a JWT if valid.
5.	The frontend stores the JWT token in localStorage and redirects the user to a dashboard or home page.
6.	On page load, useEffect checks for token presence to keep the user logged in.


