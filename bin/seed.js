const mongoose = require("mongoose");

const Course = require("../models/course");
require("dotenv").config();

const courses = [
  {
    name: "Python for Everybody",
    technology: "Python",
    level: "Beginner",
    description:
      "This course covers fundamental programming concepts including data structures, networked application program interfaces, and databases, using the Python programming language. In the Capstone Project, you’ll use the technologies learned throughout the course to design and create your own  applications for data retrieval, processing, and visualization.",
    link:
      "https://www.coursera.org/specializations/python?ranMID=40328&ranEAID=JVFxdTr9V80&ranSiteID=JVFxdTr9V80-08NE0mrNRIAtO8Q6lLWSdA&siteID=JVFxdTr9V80-08NE0mrNRIAtO8Q6lLWSdA",
  },

  {
    name: "Learn Python 3 from Scratch",
    technology: "Python",
    level: "Beginner",
    description:
      "The course begins by exploring the basic building blocks before moving on to higher-level concepts such as functions and loops. Fun quizzes and coding challenges will accompany you along the way to help enforce all the concepts covered in the course. By the time you're done, you'll have the skills you need to create your own basic applications in Python 3.",
    link:
      "https://www.educative.io/courses/learn-python-3-from-scratch?affiliate_id=5073518643380224",
  },

  {
    name: "Python 201 - Interactively Learn Advanced Concepts in Python 3",
    technology: "Python",
    level: "Advanced",
    description:
      "The course covers intermediate and advanced level materials. Topics include intermediate modules, unicode, generators, iterators, web related tasks with Python, testing code.",
    link:
      "https://www.educative.io/courses/python-201-interactively-learn-advanced-concepts-in-python-3?affiliate_id=5073518643380224",
  },

  {
    name: "Learn SQL Basics for Data Science",
    technology: "SQL",
    level: "Beginner",
    description:
      "The course is intended for a learner with no previous coding experience seeking to develop SQL query fluency. Through four progressively more difficult SQL projects with data science applications, you will cover topics such as SQL basics, data wrangling, SQL analysis, AB testing, distributed computing using Apache Spark, and more. These topics will prepare you to apply SQL creatively to analyze and explore data; demonstrate efficiency in writing queries; create data analysis datasets; conduct feature engineering, use SQL with other data analysis and machine learning toolsets; and use SQL with unstructured data sets. ",
    link:
      "https://www.coursera.org/specializations/learn-sql-basics-data-science",
  },

  {
    name: "Learn SQL",
    technology: "SQL",
    level: "Beginner",
    description:
      "In this course, you’ll learn how to communicate with relational databases through SQL. You’ll learn—and practice with 4 projects—how to manipulate data and build queries that communicate with more than one table.",
    link: "https://www.codecademy.com/learn/learn-sql",
  },

  {
    name: "Advanced Databases and SQL Querying",
    technology: "SQL",
    level: "Advanced",
    description:
      "This course is an advanced TSQL Querying course. The course expects that students are already aware of basic database concepts and are comfortable writing basic TSQL queries like SELECT, JOINS etc. This course cover advanced concepts like Views, Triggers, Dynamic Queries etc. The TSQL Scripts for all demos are uploaded.",
    link:
      "https://www.udemy.com/course/advanced-tsql-querying-using-sql-2014/?LSNPUBID=JVFxdTr9V80&ranEAID=JVFxdTr9V80&ranMID=39197&ranSiteID=JVFxdTr9V80-YDojMBgbFGqrmD5Fn4Bb7A&utm_medium=udemyads&utm_source=aff-campaign",
  },

  {
    name: "Data Science: R Basics",
    technology: "R",
    level: "Beginner",
    description:
      "This course will introduce you to the basics of R programming. You can better retain R when you learn it to solve a specific problem, so you’ll use a real-world dataset about crime in the United States. You will learn the R skills needed to answer essential questions about differences in crime across the different states. We’ll cover R's functions and data types, then tackle how to operate on vectors and when to use advanced functions like sorting. You’ll learn how to apply general programming features like “if-else,” and “for loop” commands, and how to wrangle, analyze and visualize data.",
    link:
      "https://online-learning.harvard.edu/course/data-science-r-basics?delta=2",
  },

  {
    name: "Statistics and R",
    technology: "R",
    level: "Beginner",
    description:
      "This course teaches the R programming language in the context of statistical data and statistical analysis in the life sciences. We will learn the basics of statistical inference in order to understand and compute p-values and confidence intervals, all while analyzing data with R code. We provide R programming examples in a way that will help make the connection between concepts and implementation. Problem sets requiring R programming will be used to test understanding and ability to implement basic data analyses. We will use visualization techniques to explore new data sets and determine the most appropriate approach. We will describe robust statistical techniques as alternatives when data do not fit assumptions required by the standard approaches. By using R scripts to analyze data, you will learn the basics of conducting reproducible research.",
    link: "",
  },

  {
    name: "Advanced R Programming",
    technology: "R",
    level: "Advanced",
    description:
      "This course covers advanced topics in R programming that are necessary for developing powerful, robust, and reusable data science tools. Topics covered include functional programming in R, robust error handling, object oriented programming, profiling and benchmarking, debugging, and proper design of functions. Upon completing this course you will be able to identify and abstract common data analysis tasks and to encapsulate them in user-facing functions. ",
    link:
      "https://www.coursera.org/learn/advanced-r?ranMID=40328&ranEAID=SAyYsTvLiGQ&ranSiteID=SAyYsTvLiGQ-qUiA4QmMQVz7AOB9dI79cg&siteID=SAyYsTvLiGQ-qUiA4QmMQVz7AOB9dI79cg",
  },

  {
    name: "Node JS API Development for Beginners",
    technology: "NodeJS",
    level: "Beginner",
    description:
      "In this course, you will learn Modern JavaScript, Node JS event loop, Asynchronous programming, using node modules, npm modules and creating your own modules, creating server, connect to database and sending json responses.",
    link:
      "https://www.udemy.com/course/node-js-api-tutorial/?LSNPUBID=JVFxdTr9V80&ranEAID=JVFxdTr9V80&ranMID=39197&ranSiteID=JVFxdTr9V80-my.Aj6zwM612JXRDtu8STA",
  },

  {
    name: "Server-side Development with NodeJS, Express and MongoDB",
    technology: "NodeJS",
    level: "Intermediate",
    description:
      "This course deals with all things server-side. We base the entire course around the NodeJS platform. We start with a brief overview of the Web protocols: HTTP and HTTPS. We examine NodeJS and NodeJS modules: Express for building web servers. On the database side, we review basic CRUD operations, NoSQL databases, in particular MongoDB and Mongoose for accessing MongoDB from NodeJS. We examine the REST concepts and building a RESTful API. We touch upon authentication and security. Finally we review backend as a service (BaaS) approaches, including mobile BaaS, both open-source and commercial BaaS services.",
    link:
      "https://www.coursera.org/learn/server-side-nodejs?ranMID=40328&ranEAID=JVFxdTr9V80&ranSiteID=JVFxdTr9V80-yuHJBeXJeU0_yc8oQYDEMw&siteID=JVFxdTr9V80-yuHJBeXJeU0_yc8oQYDEMw",
  },
  {
    name: "Intro to JavaScript",
    technology: "JavaScript",
    level: "Beginner",
    description: "Complete guide to help you go from novice to coding ninja!",
    link: "",
  },
  {
    name: "JavaScript - Advanced Concepts",
    technology: "JavaScript",
    level: "Intermediate",
    description:
      "By the end of this course, you'll be able to answer one of codings biggest questions - what is this?",
    link: "",
  },
  {
    name: "The JS MasterClass",
    technology: "JavaScript",
    level: "Advanced",
    description:
      "All the advanced concepts you need to know to become confident in JS",
    link: "",
  },
  {
    name: "HTML5 from 0",
    technology: "HTML",
    level: "Beginner",
    description:
      "If you've had no previous experience this is the course for you. Taking you from the very basics to understand HTML5.",
    link: "",
  },
  {
    name: "HTML5 & CSS3 - Learn to build responsive websites",
    technology: "HTML",
    level: "Intermediate",
    description:
      "A step by step, detailed course to help you build your first website",
    link: "",
  },
  {
    name: "Introduction to CSS & HTML",
    technology: "CSS",
    level: "Beginner",
    description:
      "The perfect course for beginners. To give you basic concepts to build a web page  ",
    link: "",
  },
  {
    name: "Advanced CSS - Flexbox, gradients and more",
    technology: "CSS",
    level: "Advanced",
    description: "Learn some of the more advanced topics in CSS.",
    link: "",
  },
  {
    name: "DOM",
    technology: "JavaScript",
    level: "Advanced",
    description: "The worst concept made bearable",
    link: "",
  },
  {
    name: "Redux, react hooks and GraphQL",
    technology: "React",
    level: "Advanced",
    description:
      "Join this advanved course and learn how to implement redux using react hooks and GraphQL",
    link: "",
  },
  {
    name: "Javascript frameworks - Complete guide to Reach.js",
    technology: "React",
    level: "Beginner",
    description: "All you'll need to know to get you started with React.js",
    link: "",
  },
];

// MONGOOSE CONNECTION

mongoose
  .connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
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
