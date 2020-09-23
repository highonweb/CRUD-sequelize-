# CRUD-sequelize-

This Web-App is basically built upon nodeJs Express and Sequelize ORM to maintain records of students and teachers
Don't expect a lot of functionality this is just a PoC website

## Open Endpoints

Open endpoints require no Authentication.

    New Student : POST /api/student/new
        dept
        name
        rollno

    New Teacher : POST /api/teacher/new
        dept
        name
        subject

## Closed endpoints

Closed endpoints require a valid Token to be included in the header of the request. A Token can be acquired by creating new Student from above mentioned
Open endpoints

Each endpoint manipulates or displays information related to the User whose Token is provided with the request:

    Show teacher info : GET /api/teacher/

    Show student info : GET /api/student/

    Update teacher info : GET /api/teacher/chng/
        name or/and subject

    Update student info : GET /api/student/chng/
        name

    Delete teacher info : GET /api/teacher/kill

    Delete student info : GET /api/student/kill

## Admin endpoints

Endpoint for viewing all the Accounts

    Show Department info : GET /api/hod/
        dept
