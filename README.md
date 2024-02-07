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


GET  API:-
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

6) Get the Class with the subject as the teacherId passed in the param using lookup
Url:http://localhost:3000/school/getsubclassdata/:teacherId
Response:Details, It will give the  list of number of subject in the class as teacherId is passed in the param.

E) Library Management System
GET API
Method used:GET
1) Create Library
Url:http://localhost:3000/school/newlibrary
Response:

2) Create Category
Url:http://localhost:3000/school/newlibrary
Response:

3) Create Book
Url:http://localhost:3000/school/newbook
Response:

4)Create book Issue and Return
Url:http://localhost:3000/school/issuereturnbook
Response:

F)Reterive Data:
Method used: GET
1) Get library By libraryId
Url:http://localhost:3000/school/getlibrary/:id
Response:

2) Get Books by CategoryId
Url:http://localhost:3000/school/getbooks/:id
Response:

3) Get Books by BookId
Url:http://localhost:3000/school/getbookdetail/:id
Response:

4) Get Books by LibraryId
Url:http://localhost:3000/school/getbookoflibrary/:id
Response:

G) UPDATE API for School as well as Library:--
Check applied that as we update  the data as if it is already associated with the existing rrecord it will through error.
Method Used:PUT

1) Update School
Url:http://localhost:3000/school/updatedschool/:id
check: School should have unique email
Response:

2) Update Class 
Url:http://localhost:3000/school/updateclassdetail/:id
Check on: class should have unique slug
Response:

3) Update Section
Url:http://localhost:3000/school/updatesectiondetail/:id
Check on: Unique slug
Response:

4) Update Student
Url:http://localhost:3000/school//updatestudentdetail/:id
Check on:Unique email
Response:

5) Update Teacher
Url:http://localhost:3000/school/updateteacher/:id
Check on: Unique Email 
Response

6) Update Subject:
Url:http://localhost:3000/school/updatesubject/:id
Check on: slug should be unique
Response: 

7) Update Library
Url:http://localhost:3000/school/updatelibrary/:id
Check on: email should be unique
Response:

8) Update Category
Url:http://localhost:3000/school/updatecategory/:id
Check on:Unique CategoryName
Response

9) Update Book
Url:http://localhost:3000/school/updatebook/:id
Check on: Unique slug
Response:

H) DELETE API: SOFT Delete the school
Method Used: DELETE

1) Soft Delete School
Url:http://localhost:3000/school/deleteschool/:id
Check on :If we soft delete the school and to use its email address to another school it will allow us to do that is will not through the error
Response: School is sot ddeleted successfully

2) Soft delete the hierarchy : 
Check on: When we want to  delete the school will check the the hierarchy and soft delete the class, section and student under the school
Url: http://localhost:3000/school/deleteschoolecord/:id
Response: Soft delete the hierarchy o school

G) UPLOAD Image
1) Upload the single image
Url:http://localhost:3000/school/singleimage
Response:School image uploaded successfully

2) Upload the multiple images
Url:http://localhost:3000/school/multipleimage
Response: