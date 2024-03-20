import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Code from "./Pages/Code";
import Submissions from "./Pages/Submissions";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Code />} />
        <Route path="/submissions" element={<Submissions />} />
      </Routes>
    </Router>
  );
}

export default App;
