import './App.css';
import FilterableCourses from './components/FilteredCourses';

function App() {

  const COURSES = [
    { category: "Programming", price: "$100", available: true, name: "JavaScript Basics" },
    { category: "Programming", price: "$200", available: false, name: "Advanced Python" },
    { category: "Design", price: "$150", available: true, name: "UI/UX Design Fundamentals" },
    { category: "Design", price: "$300", available: false, name: "Advanced Graphic Design" },
    { category: "Marketing", price: "$120", available: true, name: "SEO Basics" },
    { category: "Marketing", price: "$220", available: false, name: "Advanced Social Media Marketing" }
]; 

  return (
   <FilterableCourses COURSES = {COURSES}/>
  );
}

export default App;
