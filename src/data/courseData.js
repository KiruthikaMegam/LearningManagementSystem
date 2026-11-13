
export const initialCourses = [
  {
    id: "java-fullstack",
    title: "Java Full Stack Development",
    category: "Development",
    level: "Beginner",
    duration: "6 Months",
    fee: 25000,
    rating: 4.8,
    students: 1250,
    mode: ["Online", "Offline"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZbn3EOtaxKPmHwEUe1-wI7BnwsahU81Ki3r5BxuDJg&s=10/assets/java.jpg",
    shortDescription: "Learn Java, Spring Boot, SQL and modern frontend development.",
    description: "Become a professional Java Full Stack Developer by learning frontend, backend, database and real-world application development.",
    instructor: {
      name: "Arun Kumar",
      role: "Senior Java Developer",
      experience: "8 Years Experience"
    },
    placement: "Placement Assistance Available",
    lessons: [
      { id: "java-1", title: "Introduction to Java", duration: "25 min" },
      { id: "java-2", title: "Java Fundamentals", duration: "45 min" },
      { id: "java-3", title: "Object Oriented Programming", duration: "50 min" },
      { id: "java-4", title: "HTML and CSS Basics", duration: "40 min" },
      { id: "java-5", title: "JavaScript Fundamentals", duration: "45 min" },
      { id: "java-6", title: "SQL and Database", duration: "50 min" },
      { id: "java-7", title: "Spring Boot", duration: "60 min" },
      { id: "java-8", title: "Final Project", duration: "90 min" }
    ]
  },
  {
    id: "python-fullstack",
    title: "Python Full Stack Development",
    category: "Development",
    level: "Beginner",
    duration: "5 Months",
    fee: 22000,
    rating: 4.7,
    students: 980,
    mode: ["Online", "Offline"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwp0ByEafVOJfFCRT-5Sp04ZU6WegszGZYns98lMs-DQ&s=10",
    shortDescription: "Master Python, Django, databases and frontend development.",
    description: "Learn to build complete web applications using Python, Django, HTML, CSS, JavaScript and databases.",
    instructor: {
      name: "Priya Sharma",
      role: "Python Developer",
      experience: "6 Years Experience"
    },
    placement: "Placement Assistance Available",
    lessons: [
      { id: "python-1", title: "Python Introduction", duration: "25 min" },
      { id: "python-2", title: "Python Basics", duration: "40 min" },
      { id: "python-3", title: "Functions and OOP", duration: "50 min" },
      { id: "python-4", title: "HTML and CSS", duration: "40 min" },
      { id: "python-5", title: "Django Framework", duration: "60 min" },
      { id: "python-6", title: "Database Integration", duration: "45 min" },
      { id: "python-7", title: "Project Development", duration: "90 min" }
    ]
  },
  {
    id: "software-testing",
    title: "Software Testing",
    category: "Testing",
    level: "Beginner",
    duration: "4 Months",
    fee: 18000,
    rating: 4.9,
    students: 1450,
    mode: ["Online", "Offline"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSUjzCiU6oTW5Cx3hTC-y0bqEm5QYdKQCUPSg_OXONLQ&s=10",
    shortDescription: "Learn manual testing, automation testing and Selenium.",
    description: "Understand software testing concepts, test cases, bug tracking, automation testing and Selenium tools.",
    instructor: {
      name: "Rahul Raj",
      role: "Automation Test Engineer",
      experience: "9 Years Experience"
    },
    placement: "Placement Assistance Available",
    lessons: [
      { id: "test-1", title: "Introduction to Testing", duration: "30 min" },
      { id: "test-2", title: "Manual Testing", duration: "45 min" },
      { id: "test-3", title: "SDLC and STLC", duration: "40 min" },
      { id: "test-4", title: "Test Case Writing", duration: "50 min" },
      { id: "test-5", title: "Selenium Introduction", duration: "45 min" },
      { id: "test-6", title: "Automation Testing", duration: "60 min" },
      { id: "test-7", title: "Testing Project", duration: "90 min" }
    ]
  },
  {
    id: "react-development",
    title: "React JS Development",
    category: "Development",
    level: "Intermediate",
    duration: "3 Months",
    fee: 15000,
    rating: 4.8,
    students: 870,
    mode: ["Online", "Offline"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbvBRa5Jy2UYJa-OFmz2oQjm8lNiOZE6MoGE1tXE2aVg&s=10",
    shortDescription: "Build modern websites using React JS and JavaScript.",
    description: "Learn React components, hooks, routing, state management, API integration and responsive frontend development.",
    instructor: {
      name: "Karthik Raj",
      role: "Frontend Developer",
      experience: "7 Years Experience"
    },
    placement: "Placement Assistance Available",
    lessons: [
      { id: "react-1", title: "JavaScript Revision", duration: "35 min" },
      { id: "react-2", title: "React Introduction", duration: "30 min" },
      { id: "react-3", title: "Components and Props", duration: "45 min" },
      { id: "react-4", title: "React Hooks", duration: "50 min" },
      { id: "react-5", title: "React Router", duration: "40 min" },
      { id: "react-6", title: "API Integration", duration: "55 min" },
      { id: "react-7", title: "Final React Project", duration: "90 min" }
    ]
  },
  {
    id: "data-science",
    title: "Data Science with Python",
    category: "Data Science",
    level: "Intermediate",
    duration: "6 Months",
    fee: 28000,
    rating: 4.6,
    students: 760,
    mode: ["Online", "Offline"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5aaUfJep3qGTF4_xnKa_mEDXOPFFsXZT28S0NgcLjtw&s=10",
    shortDescription: "Explore Python, data analysis and machine learning.",
    description: "Develop data science skills through Python programming, data visualization, statistics and machine learning.",
    instructor: {
      name: "Meena Devi",
      role: "Data Scientist",
      experience: "8 Years Experience"
    },
    placement: "Placement Assistance Available",
    lessons: [
      { id: "data-1", title: "Data Science Introduction", duration: "30 min" },
      { id: "data-2", title: "Python for Data Science", duration: "50 min" },
      { id: "data-3", title: "NumPy and Pandas", duration: "55 min" },
      { id: "data-4", title: "Data Visualization", duration: "45 min" },
      { id: "data-5", title: "Statistics", duration: "50 min" },
      { id: "data-6", title: "Machine Learning", duration: "60 min" },
      { id: "data-7", title: "Data Science Project", duration: "90 min" }
    ]
  },
  {
    id: "uiux-design",
    title: "UI/UX Design",
    category: "Design",
    level: "Beginner",
    duration: "3 Months",
    fee: 16000,
    rating: 4.7,
    students: 650,
    mode: ["Online", "Offline"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdtrLiMQlWXSILUj_gUuYR-QaXpP7xKw1uNKM5wNebyQ&s=10",
    shortDescription: "Learn user interface and user experience design.",
    description: "Understand design principles, wireframing, prototyping and user experience using professional design tools.",
    instructor: {
      name: "Divya Priya",
      role: "UI/UX Designer",
      experience: "5 Years Experience"
    },
    placement: "Placement Assistance Available",
    lessons: [
      { id: "ui-1", title: "Introduction to UI/UX", duration: "30 min" },
      { id: "ui-2", title: "Design Principles", duration: "40 min" },
      { id: "ui-3", title: "Wireframing", duration: "45 min" },
      { id: "ui-4", title: "Figma Basics", duration: "50 min" },
      { id: "ui-5", title: "Prototyping", duration: "45 min" },
      { id: "ui-6", title: "User Research", duration: "40 min" },
      { id: "ui-7", title: "Final Design Project", duration: "90 min" }
    ]
  }
];
