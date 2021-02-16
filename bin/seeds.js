require("dotenv").config();

const mongoose = require("mongoose");
const Course = require("../models/course");
const courses = [
  {
    name: "Python for Everybody",
    technology: "python",
    level: "Beginner",
    description:
      "This course covers fundamental programming concepts including data structures, networked application program interfaces, and databases, using the Python programming language. In the Capstone Project, you'll use the technologies learned throughout the course to design and create your own  applications for data retrieval, processing, and visualization.",
    link:
      "https://www.coursera.org/specializations/python?ranMID=40328&ranEAID=JVFxdTr9V80&ranSiteID=JVFxdTr9V80-08NE0mrNRIAtO8Q6lLWSdA&siteID=JVFxdTr9V80-08NE0mrNRIAtO8Q6lLWSdA",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469740/images/python_rm6wqd.jpg",
    duration: "3 hours/week - approx. 8 months to complete",
  },
  {
    name: "Learn Python 3 from Scratch",
    technology: "python",
    level: "Beginner",
    description:
      "The course begins by exploring the basic building blocks before moving on to higher-level concepts such as functions and loops. Fun quizzes and coding challenges will accompany you along the way to help enforce all the concepts covered in the course. By the time you're done, you'll have the skills you need to create your own basic applications in Python 3.",
    link:
      "https://www.educative.io/courses/learn-python-3-from-scratch?affiliate_id=5073518643380224",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469740/images/python_rm6wqd.jpg",
    duration: "10 hours",
  },
  {
    name: "Python 201 - Interactively Learn Advanced Concepts in Python 3",
    technology: "python",
    level: "Advanced",
    description:
      "The course covers intermediate and advanced level materials. Topics include intermediate modules, unicode, generators, iterators, web related tasks with Python, testing code.",
    link:
      "https://www.educative.io/courses/python-201-interactively-learn-advanced-concepts-in-python-3?affiliate_id=5073518643380224",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469740/images/python_rm6wqd.jpg",
    duration: "11 hours",
  },
  {
    name: "Learn SQL Basics for Data Science",
    technology: "sql",
    level: "Beginner",
    description:
      "The course is intended for a learner with no previous coding experience seeking to develop SQL query fluency. Through four progressively more difficult SQL projects with data science applications, you will cover topics such as SQL basics, data wrangling, SQL analysis, AB testing, distributed computing using Apache Spark, and more. These topics will prepare you to apply SQL creatively to analyze and explore data; demonstrate efficiency in writing queries; create data analysis datasets; conduct feature engineering, use SQL with other data analysis and machine learning toolsets; and use SQL with unstructured data sets. ",
    link:
      "https://www.coursera.org/specializations/learn-sql-basics-data-science",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469736/images/sql_cxebql.jpg",
    duration: "5 hours/week - approx. 4 months to complete",
  },
  {
    name: "Learn SQL",
    technology: "sql",
    level: "Beginner",
    description:
      "In this course, you'll learn how to communicate with relational databases through SQL. You'll learn—and practice with 4 projects—how to manipulate data and build queries that communicate with more than one table.",
    link: "https://www.codecademy.com/learn/learn-sql",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469736/images/sql_cxebql.jpg",
    duration: "8 hours",
  },
  {
    name: "Advanced Databases and SQL Querying",
    technology: "sql",
    level: "Advanced",
    description:
      "This course is an advanced TSQL Querying course. The course expects that students are already aware of basic database concepts and are comfortable writing basic TSQL queries like SELECT, JOINS etc. This course cover advanced concepts like Views, Triggers, Dynamic Queries etc. The TSQL Scripts for all demos are uploaded.",
    link:
      "https://www.udemy.com/course/advanced-tsql-querying-using-sql-2014/?LSNPUBID=JVFxdTr9V80&ranEAID=JVFxdTr9V80&ranMID=39197&ranSiteID=JVFxdTr9V80-YDojMBgbFGqrmD5Fn4Bb7A&utm_medium=udemyads&utm_source=aff-campaign",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469736/images/sql_cxebql.jpg",
    duration: "3 hours",
  },
  {
    name: "Data Science: R Basics",
    technology: "r",
    level: "Beginner",
    description:
      "This course will introduce you to the basics of R programming. You can better retain R when you learn it to solve a specific problem, so you'll use a real-world dataset about crime in the United States. You will learn the R skills needed to answer essential questions about differences in crime across the different states. We'll cover R's functions and data types, then tackle how to operate on vectors and when to use advanced functions like sorting. You'll learn how to apply general programming features like 'if-else' and 'for loop' commands, and how to wrangle, analyze and visualize data.",
    link:
      "https://online-learning.harvard.edu/course/data-science-r-basics?delta=2",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469742/images/r_y3nnm4.jpg",
    duration: "1-2 hours/week - approx. 8 weeks to complete",
  },
  {
    name: "Statistics and R",
    technology: "r",
    level: "Beginner",
    description:
      "This course teaches the R programming language in the context of statistical data and statistical analysis in the life sciences. We will learn the basics of statistical inference in order to understand and compute p-values and confidence intervals, all while analyzing data with R code. We provide R programming examples in a way that will help make the connection between concepts and implementation. Problem sets requiring R programming will be used to test understanding and ability to implement basic data analyses. We will use visualization techniques to explore new data sets and determine the most appropriate approach. We will describe robust statistical techniques as alternatives when data do not fit assumptions required by the standard approaches. By using R scripts to analyze data, you will learn the basics of conducting reproducible research.",
    link: "https://online-learning.harvard.edu/course/statistics-and-r?delta=0",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469742/images/r_y3nnm4.jpg",
    duration: "2-4 hours/week - approx. 4 weeks to complete",
  },
  {
    name: "Advanced R Programming",
    technology: "r",
    level: "Advanced",
    description:
      "This course covers advanced topics in R programming that are necessary for developing powerful, robust, and reusable data science tools. Topics covered include functional programming in R, robust error handling, object oriented programming, profiling and benchmarking, debugging, and proper design of functions. Upon completing this course you will be able to identify and abstract common data analysis tasks and to encapsulate them in user-facing functions. ",
    link:
      "https://www.coursera.org/learn/advanced-r?ranMID=40328&ranEAID=SAyYsTvLiGQ&ranSiteID=SAyYsTvLiGQ-qUiA4QmMQVz7AOB9dI79cg&siteID=SAyYsTvLiGQ-qUiA4QmMQVz7AOB9dI79cg",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469742/images/r_y3nnm4.jpg",
    duration: "18 hours",
  },
  {
    name: "Node JS API Development for Beginners",
    technology: "nodejs",
    level: "Beginner",
    description:
      "In this course, you will learn Modern JavaScript, Node JS event loop, Asynchronous programming, using node modules, npm modules and creating your own modules, creating server, connect to database and sending json responses.",
    link:
      "https://www.udemy.com/course/node-js-api-tutorial/?LSNPUBID=JVFxdTr9V80&ranEAID=JVFxdTr9V80&ranMID=39197&ranSiteID=JVFxdTr9V80-my.Aj6zwM612JXRDtu8STA",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469732/images/nodejs_sh1svf.png",
    duration: "3 hours",
  },
  {
    name: "Server-side Development with NodeJS, Express and MongoDB",
    technology: "nodejs",
    level: "Intermediate",
    description:
      "This course deals with all things server-side. We base the entire course around the NodeJS platform. We start with a brief overview of the Web protocols: HTTP and HTTPS. We examine NodeJS and NodeJS modules: Express for building web servers. On the database side, we review basic CRUD operations, NoSQL databases, in particular MongoDB and Mongoose for accessing MongoDB from NodeJS. We examine the REST concepts and building a RESTful API. We touch upon authentication and security. Finally we review backend as a service (BaaS) approaches, including mobile BaaS, both open-source and commercial BaaS services.",
    link:
      "https://www.coursera.org/learn/server-side-nodejs?ranMID=40328&ranEAID=JVFxdTr9V80&ranSiteID=JVFxdTr9V80-yuHJBeXJeU0_yc8oQYDEMw&siteID=JVFxdTr9V80-yuHJBeXJeU0_yc8oQYDEMw",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469732/images/nodejs_sh1svf.png",
    duration: "48 hours",
  },
  {
    name: "Intro to JavaScript - Learn the basics",
    technology: "javascript",
    level: "Beginner",
    description: "Learn the complete basics of JS - perfect for novices!",
    link:
      "https://www.udemy.com/course/the_complete_javascript_course_for_beginners/",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469730/images/javascript_ln3knc.png",
    duration: "1hr 6mins",
  },
  {
    name: "JavaScript - Advanced Concepts",
    technology: "javascript",
    level: "Advanced",
    description:
      "By the end of this course, you'll be able to answer one of codings biggest questions - what is this?",
    link:
      "https://www.udemy.com/course/advanced-and-object-oriented-javascript/",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469730/images/javascript_ln3knc.png",
    duration: "5hr 24min",
  },
  {
    name: "Javascript Essentials",
    technology: "javascript",
    level: "Intermediate",
    description:
      "This course teaches you everything you need to build your first project.",
    link: "https://www.udemy.com/course/javascript-essentials/",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469730/images/javascript_ln3knc.png",
    duration: "6hr 30min",
  },
  {
    name: "HTML5 from beginners",
    technology: "html",
    level: "Beginner",
    description:
      "If you've had no previous experience this is the course for you. Taking you from the very basics step by step to be able to create your very first project.",
    link: "https://www.udemy.com/course/hmtl5-training/",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469728/images/html_lqpjj3.jpg",
    duration: "2hr 39min",
  },
  {
    name: "HTML5 & CSS3 - Learn to build responsive websites",
    technology: "html",
    level: "Intermediate",
    description:
      "A step by step, detailed course to help you build your first website",
    link: "https://www.udemy.com/course/learn-to-code-in-html-and-css/",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469728/images/html_lqpjj3.jpg",
    duration: "2hr 3min",
  },
  {
    name: "Introduction to CSS & HTML",
    technology: "css",
    level: "Beginner",
    description:
      "Without CSS every webpage would just be plain text and boring. With this step but step course for beginners you'll learn many aspects of styling web pages to create something suited to your needs",
    link: "https://www.codecademy.com/learn/learn-css",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469725/images/css_obdpfq.jpg",
    duration: "20 hours to complete in total",
  },
  {
    name: "Advanced CSS - Flexbox, gradients and more",
    technology: "css",
    level: "Advanced",
    description:
      "LLearn some of the more advanced topics in CSS. Extra link: https://flexboxfroggy.com/",
    link: "https://www.udemy.com/course/advanced-css-and-sass/",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469725/images/css_obdpfq.jpg",
    duration: "28 hours on-demand video",
  },
  {
    name: "Javascript and the DOM",
    technology: "javascript",
    level: "Advanced",
    description:
      "This course will teach you everything you need to know about the DOM (Document Object Model)",
    link: "https://classroom.udacity.com/courses/ud117",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469730/images/javascript_ln3knc.png",
    duration: "8 hours",
  },
  {
    name: "Redux, react hooks and GraphQL",
    technology: "react",
    level: "Advanced",
    description:
      "Join this advanved course and learn the complete react-redux system.",
    link: "https://www.udemy.com/course/modern-react/",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469734/images/react_u5w0fw.png",
    duration: "4hr 38min",
  },
  {
    name: "Javascript frameworks - React.js for beginners",
    technology: "react",
    level: "Beginner",
    description: "All you'll need to know to get you started with React.js",
    link: "https://www.udemy.com/course/react-tutorial/",
    image:
      "https://res.cloudinary.com/skillbees/image/upload/v1613469734/images/react_u5w0fw.png",
    duration: "2hr 49min ",
  },
];

// MONGOOSE CONNECTION

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log("Connected to the DB");
    const pr = x.connection.dropDatabase();
    return pr;
  })
  .then(() => {
    const pr = Course.create(courses);
    return pr;
  })
  .then((createdCourses) => {
    console.log(`Created ${createdCourses.length} courses.`);
    mongoose.connection.close();
  })
  .catch((err) => console.log("Error connection to the DB", err));
