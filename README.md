Project Title : new_crud
Description : This project is for to create the School Management System
project gitlink:https://github.com/AditiSaggar/School-Management-System


How to start : 
 npm init : This command ask you to about  details  you need to fill. like:  name of the project,auhtor, description.
 After that file is created of name package.json.
In this file you can see the main file of your project.

To install the package npm install <package name>
Package Installed :
    "bcrypt": "^5.1.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "joi": "^17.12.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.1.0",
    "nanoid": "^3.3.6",
    "nodemon": "^3.0.3"


    How to run the project: npm start
To refresh the project :npx nodemon

Testing in the Postman:
To check the API is working or not: 

1) SIGU_UP::Create Class
Method used: Post
Url :http://localhost:3000/school/signup
Response:School is created successfully

2)LOGIN
Method used: Post
Url :http://localhost:3000/school/login
Response:School login successfully

3)Create Class
Url :http://localhost:3000/school/newClass
Response:Class created successfully

4)Create Section
Url:http://localhost:3000/school/newsection
Response:Section created successfully

5)Create Student
Url:http://localhost:3000/school/newstudent
Response:Student created successfully

B)Method used: Put
1)Update School
Url:http://localhost:3000/school/update/:id
Response:School updated successfully

2)Update Class
Url:http://localhost:3000/school/updateCls/:id
Response:Class updated successfully

3)Update Section
Url:http://localhost:3000/school/updateSect/:id
Response:Section updated successfully

4)Update Student
Url:http://localhost:3000/school/updateStu/:id
Response:Student updated successfully

