Project Title: School Management System
Description : This project is for to create the School Management System
project gitlink:https://github.com/AditiSaggar/School-Management-System


How to start : 
 npm init : This command ask you to about  details  you need to fill. like:  name of the project,auhtor, description.
 After that file is created of name package.json.
In this file you can see the main file of your project.

To install the package npm install <packagename>
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

6)Create Teacher
Url:http://localhost:3000/school/newteacher
Response:Teacher created successfully

7)Create Subject
Url:http://localhost:3000/school/newsubject
Response:Subject created successfully

8)Linking Subject and Teacher
Url:http://localhost:3000/school/createlinking
Response:Subject linked to teacher successfully

9)Linking Teacher,Subject and Class
Url:http://localhost:3000/school/createlinks
Response:Teacher,Subject an Class are linked successfully

B)UPDATE API 
Method used: PUT
1)Update School
Url:http://localhost:3000/school/update/:id
Response:School updated successfully

2)Update Class
Url:http://localhost:3000/school/updateCls/:id
Response:Class updated successfully

3) Update Section
Url:http://localhost:3000/school/updateSect/:id
Response:Section updated successfully

4) Update Student
Url:http://localhost:3000/school/updateStu/:id
Response:Student updated successfully

5)Update Subject
Url:
Response:
6)Update Class
Url:
Response:

7)Update Teacher
Url:
Response:

C) Get All Data from School,Class,Section,and Student,
Method Used:GET
1) Get School
Url:http://localhost:3000/school/getallschool
Response:"School retrieved successfully"

2) Get Class
Url:http://localhost:3000/school/getallclasses
Response:Classes retrieved successfully

3) Get Section
Url:http://localhost:3000/school/getallsections
Response:Section retrieved successfully

4) Get Student
Url:http://localhost:3000/school/getallstudents
Response:All the Students retrieved successfully

D) Get API 
Method Used:GET
1) To get the Count of student in the particular school when passed the school id in the param
Url:http://localhost:3000/school/getstudents/:schoolId
Response:Student retrieved successfully

2)To get the Count of class in the particular school when passed the school id in the param
Url:http://localhost:3000/school/getstudents/:schoolId
Response:Classes retrieved successfully, also it will give the count of the total classes in the school

3) To get the Count of student in the particular class when passed the class id in the param
Url:http://localhost:3000/school/getstudentsbyclass/:classId
Response:Student retrieved successfully, also it will give the count of the total students in the class

4) Get the Students when the sectionId has been passed in the param
Url:http://localhost:3000/school/getstudentsbysection/:sectionId
Response:Student retrieved successfully, also it will give the count of the total students in the paticular section

5) Get all the subject as the teacherId passed in the param using lookup
Url:http://localhost:3000/school/getSubjectdata/:teacherId
Response:Subject Detail, It will give the  list of number of subject as teacherId passed in the param

6)Get the Class with the subject as the teacherId passed in the param using lookup
Url:http://localhost:3000/school/getsubclassdata/:teacherId
Response:Details, It will give the  list of number of subject in the class as teacherId is passed in the param.

E) Library Management System
GET API
Method used:GET
1) Create Library
Url:

2) Create Category

3) Create Book


4)Create book Issue and Returnd


F) Update API
Method Used:PUT
1)Update library

2)Update Category

3)Update Book