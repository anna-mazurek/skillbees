## Description

Skillsbees is an app that allows users to browse and access a library of online video courses related to Web Dev and Data and save a list of their favourites.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.

- **500** - As a user I want to see a nice error page when the developers screw it up so that I know that is not my fault.

- **homepage** - As a user I want to be able to access the homepage, see desciprtion of that app and be able to login or sign up.

- **sign up** - As a user I want to sign up on the web page/app so that I can have access to the private pages, select a technology, browse a library of related courses and save to my favourites list.

- **login** - As a user I want to be able to login on the web page so that I can access my account.

- **logout** - As a user I want to be able to log out from the web page/app to ensure that no one will access my account.

- **delete user** - As a user I want to be able to delete my profile.

- **technology list** - As a user I want to be able to see a list of all technologies available and find a library of courses from them

- **course list** - As a user I want to be able to see a list of all courses related to a specific technology and mark them as favourite

- **favorites list** - As a user I want to see a list of my favorite courses and be able to add or remove them

## API Routes

| **Method** | **Route**                    | **Description**                                              | Request - Body      |
| ---------- | ---------------------------- | ------------------------------------------------------------ | ------------------- |
| `GET`      | `/`                          | Main page route. Renders home `index` view.                  |                     |
| `GET`      | `/login`                     | Renders `login` form view.                                   |                     |
| `POST`     | `/login`                     | Sends Login form data to the server.                         | { email, password } |
| `GET`      | `/signup`                    | Renders `signup` form view.                                  |                     |
| `POST`     | `/signup`                    | Sends Sign Up info to the server and creates user in the DB. | { email, password } |
| `GET`      | `/logout`                    | Ends the session and renders `login` form view.              |                     |
| `GET`      | `/user/technologies`         | Renders `technologies-list` view.                            |                     |
| `GET`      | `/user/favorites`            | Renders `favourites` page.                                   |                     |
| `POST`     | `/user/favorites/`           | Adds a new favorite for the current user.                    | { id }              |
| `DELETE`   | `/user/favorites/:courseId`  | Deletes the existing favorite from the current user.         |                     |
| `GET`      | `/user/technologies/:techId` | Renders list of courses based on the technology.             |                     |

## Models

User model

```javascript
{
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
}
```

Course model

```javascript
{
    name: {type: String, required: true},
    technology: {type: String, required: true},
    level: {type: String, enum: ["Beginner", "Intermediate", "Advanced"]},
    description: {type: String},
    link: {type: String, required: true},
}
```

## Backlogs

- Add Teacher option - add/update/remove your own courses to the database
- Display full list of courses of the teacher
- Add reviews to the courses
- Filter courses by the Teacher

## Links

[Trello Board](https://trello.com/b/8Xv71HGl/project-2-ih)
