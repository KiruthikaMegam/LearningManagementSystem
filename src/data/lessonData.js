
export const lessonContent = {
  "java-1": {
    title: "Introduction to Java",
    description: "Learn what Java is and why it is used in software development.",
    content: `
Java is a popular, object-oriented programming language.

Java is used to develop:
1. Web applications
2. Mobile applications
3. Desktop applications
4. Enterprise applications

Java is platform independent because Java programs run on the Java Virtual Machine (JVM).

Important Java features:
- Simple
- Object Oriented
- Secure
- Platform Independent
- Robust
`,
    video: ""
  },

  "java-2": {
    title: "Java Fundamentals",
    description: "Understand Java variables, data types and operators.",
    content: `
Java fundamentals are the basic building blocks of Java programming.

Variables store data values.

Example:
int age = 25;
String name = "Alex";
double salary = 25000.50;

Java data types:
- int
- float
- double
- char
- boolean
- String

Operators are used to perform calculations and comparisons.
`,
    video: ""
  },

  "java-3": {
    title: "Object Oriented Programming",
    description: "Understand the four main concepts of OOP.",
    content: `
Object Oriented Programming is a programming approach based on objects and classes.

Four main OOP concepts:

1. Encapsulation
2. Inheritance
3. Polymorphism
4. Abstraction

A class is a blueprint for creating objects.

An object is an instance of a class.
`,
    video: ""
  },

  "react-1": {
    title: "JavaScript Revision",
    description: "Revise important JavaScript concepts before learning React.",
    content: `
JavaScript is a programming language used to create interactive web applications.

Important concepts:
- Variables
- Functions
- Arrays
- Objects
- ES6 features
- Arrow functions
- Promises
- Async and Await

JavaScript is the foundation for React development.
`,
    video: ""
  },

  "react-2": {
    title: "React Introduction",
    description: "Understand React and its advantages.",
    content: `
React is a JavaScript library used to build user interfaces.

Important React features:
- Component based architecture
- Reusable components
- Virtual DOM
- State management
- One way data flow

React helps developers create interactive web applications.
`,
    video: ""
  },

  "python-1": {
    title: "Python Introduction",
    description: "Learn about Python and its applications.",
    content: `
Python is a high-level programming language.

Python is used in:
- Web development
- Data science
- Artificial intelligence
- Machine learning
- Automation

Python has simple and readable syntax.
`,
    video: ""
  },

  "test-1": {
    title: "Introduction to Testing",
    description: "Understand software testing fundamentals.",
    content: `
Software testing is the process of checking whether an application works correctly.

Main types of testing:
- Manual Testing
- Automation Testing
- Functional Testing
- Performance Testing
- Regression Testing

Testing helps improve software quality.
`,
    video: ""
  },

  "data-1": {
    title: "Data Science Introduction",
    description: "Understand the fundamentals of data science.",
    content: `
Data Science is the process of extracting useful information from data.

Data Science includes:
- Data Collection
- Data Cleaning
- Data Analysis
- Data Visualization
- Machine Learning

Python is widely used in data science.
`,
    video: ""
  },

  "ui-1": {
    title: "Introduction to UI/UX",
    description: "Understand the difference between UI and UX design.",
    content: `
UI means User Interface.

UX means User Experience.

UI focuses on:
- Colors
- Typography
- Buttons
- Layout
- Visual elements

UX focuses on:
- User satisfaction
- Navigation
- Accessibility
- Usability

Both are important for creating successful digital products.
`,
    video: ""
  }
};

export const quizQuestions = {
  "java-fullstack": [
    {
      id: 1,
      question: "Who developed Java?",
      options: ["Microsoft", "James Gosling", "Google", "Apple"],
      answer: "James Gosling"
    },
    {
      id: 2,
      question: "Which keyword is used to create a class in Java?",
      options: ["function", "define", "class", "object"],
      answer: "class"
    },
    {
      id: 3,
      question: "Which of these is not a primitive data type in Java?",
      options: ["int", "char", "boolean", "String"],
      answer: "String"
    },
    {
      id: 4,
      question: "What does JVM stand for?",
      options: [
        "Java Variable Method",
        "Java Virtual Machine",
        "Java Visual Model",
        "Java Verified Machine"
      ],
      answer: "Java Virtual Machine"
    },
    {
      id: 5,
      question: "Which concept allows code reuse through parent-child classes?",
      options: ["Encapsulation", "Inheritance", "Abstraction", "Compilation"],
      answer: "Inheritance"
    }
  ],

  "react-development": [
    {
      id: 1,
      question: "What is React?",
      options: [
        "Programming Language",
        "JavaScript Library",
        "Database",
        "Operating System"
      ],
      answer: "JavaScript Library"
    },
    {
      id: 2,
      question: "Which hook is used to manage state in React?",
      options: ["useEffect", "useState", "useRef", "useMemo"],
      answer: "useState"
    },
    {
      id: 3,
      question: "What is JSX?",
      options: [
        "JavaScript XML",
        "Java Syntax Extension",
        "JSON XML",
        "Java Extra Code"
      ],
      answer: "JavaScript XML"
    },
    {
      id: 4,
      question: "Which method is used to render a list in React?",
      options: ["map()", "push()", "pop()", "join()"],
      answer: "map()"
    },
    {
      id: 5,
      question: "Which hook is used for side effects?",
      options: ["useState", "useEffect", "useContext", "useId"],
      answer: "useEffect"
    }
  ],

  "python-fullstack": [
    {
      id: 1,
      question: "Who created Python?",
      options: ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Mark Zuckerberg"],
      answer: "Guido van Rossum"
    },
    {
      id: 2,
      question: "Which keyword defines a function in Python?",
      options: ["function", "func", "def", "define"],
      answer: "def"
    },
    {
      id: 3,
      question: "Which data type stores multiple values in order?",
      options: ["int", "list", "float", "bool"],
      answer: "list"
    }
  ],

  "software-testing": [
    {
      id: 1,
      question: "What is software testing?",
      options: [
        "Writing code",
        "Checking software quality",
        "Designing websites",
        "Managing databases"
      ],
      answer: "Checking software quality"
    },
    {
      id: 2,
      question: "Which testing is performed without executing code?",
      options: [
        "Dynamic Testing",
        "Static Testing",
        "Performance Testing",
        "Load Testing"
      ],
      answer: "Static Testing"
    },
    {
      id: 3,
      question: "What is the full form of SDLC?",
      options: [
        "Software Development Life Cycle",
        "System Design Level Code",
        "Software Data Link Control",
        "System Development Language Code"
      ],
      answer: "Software Development Life Cycle"
    }
  ],

  "data-science": [
    {
      id: 1,
      question: "Which language is widely used in data science?",
      options: ["HTML", "Python", "CSS", "XML"],
      answer: "Python"
    },
    {
      id: 2,
      question: "Which Python library is used for data manipulation?",
      options: ["Pandas", "React", "Express", "Bootstrap"],
      answer: "Pandas"
    },
    {
      id: 3,
      question: "What is machine learning?",
      options: [
        "A database",
        "A type of machine",
        "Learning patterns from data",
        "A programming editor"
      ],
      answer: "Learning patterns from data"
    }
  ],

  "uiux-design": [
    {
      id: 1,
      question: "What does UI stand for?",
      options: [
        "User Interface",
        "Universal Internet",
        "User Information",
        "Unique Interaction"
      ],
      answer: "User Interface"
    },
    {
      id: 2,
      question: "Which tool is commonly used for UI/UX design?",
      options: ["Figma", "MySQL", "Node.js", "Git"],
      answer: "Figma"
    },
    {
      id: 3,
      question: "What does UX focus on?",
      options: [
        "Only colors",
        "User experience",
        "Programming syntax",
        "Database structure"
      ],
      answer: "User experience"
    }
  ]
};
