# Sci123 Quiz App (Solo Project) - Neota Moe

**Science123 Quiz App** is a full-stack web application to complement learning in the Science123 course at Augsburg College.  Sci123 is a general education science course most often taken by students looking to fulfill their general education science credit needed for graduation.  The goal of the app is to encourage learning outside of the classroom as students are engaged with food in everyday life (e.g. while cooking at home).  The app displays quiz questions based on the primary text “On Food and Cooking: The Science and Lore of the Kitchen” by Harold McGee.  Each question also provides a reference to the text to encourage students to learn more.  The quiz includes over 1000 student-written questions gathered by the professor over the course life that were not being utilized in any way to further currently enrolled student learning.

Administrator privileges allow the professor to review student-submitted questions prior to inclusion in the quiz and review flagged questions before choosing to approve or delete the question from the database.  Administrator is notified via email when a student submits a new question or flags an existing question.  

This project was built over a two week period during my time at Prime Digital Academy.


## Online Hosting
Sci 123 Quiz App is hosted at http://www.sci123.herokuapp.com.  Create your own username and password or log in with email: test@sci123.com and password: sci123.  Please send email to neota.moe@gmail.com if you'd like to log in and view app as administrator.


## Getting Started
**Note:** This application contains a significant amount of data that is not available to download with this repository.  However, the application can be run locally on your computer if you wish to create your own database questions through the application or a mongoDB management tool.

1. Clone this repository to your computer
2. From your terminal/command line, navigate to the folder with this repo.  Then type:
```
npm install
```
3. Format nodemailer settings in `submit.js` file to send email from desired email address.
4. Start server using
```
npm start
```
5. Open program on http://localhost:3444
6.  Use a mongoDB management tool such as Robo 3T (formerly Robomongo) to set up database collections according to schemas and set up administrator status.
7. Add questions to database through mongoDB management tool or once logged in to application as user by clicking on button "Submit a New Question."


## Screenshots
### Quiz Selection
https://user-images.githubusercontent.com/25421749/28000720-2529a634-64ed-11e7-99e5-41416ca241ce.png

### Quiz Question
https://user-images.githubusercontent.com/25421749/28000708-11e03c1e-64ed-11e7-8e76-15b33155232a.png

### Admin Edit View
https://user-images.githubusercontent.com/25421749/28000723-2e5bc2a0-64ed-11e7-962d-01b8795b6f03.png


## Built With
* MEAN Stack (MongoDB, Express, AngularJS, Node.js)
* Nodemailer
* Angular Material
* Passport Authentication
* Hosted on Heroku


## A Note about Solo Projects from Prime Digital Academy Website:   
**PROJECT-BASED LEARNING**   
Software engineers learn by doing—that’s why Prime dedicates the final third of the program to project-based learning. In this phase, you’ll have the chance to work a project of your own design as well as help a real-world organization solve a real-world problem. You’ll get a chance to dive into a project you’re passionate about and build an app from top to bottom on your own and you’ll learn how to be part of a successful software development team, practicing behaviors and techniques you’ll use every day as a working software engineer.    

Your solo project is an incredible opportunity to spend two full weeks sharpening your development skills while showcasing your passions. You’ll be working solo, but you’re far from alone. You’ll do daily “standup” meetings where you discuss what you’re tackling and get support where you need it from your peers and your instructors. In the end, this project will be an excellent tool to show prospective employers who you are and what you’re capable of."


## Acknowledgements
* Instructors and staff at Prime Digital Academy
* Professor Ben Stottrup at Augsburg College
