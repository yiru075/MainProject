import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header/header.jsx'
import Home from './pages/home/home.jsx'
import Education from './pages/education/education.jsx'
// Level 1 Topics
import Topic1_1 from './pages/Levels/Level1/Topic1_1.jsx'
import Topic1_2 from './pages/Levels/Level1/Topic1_2.jsx'
import Topic1_3 from './pages/Levels/Level1/Topic1_3.jsx'
import Topic1_4 from './pages/Levels/Level1/Topic1_4.jsx'
import Topic1_5 from './pages/Levels/Level1/Topic1_5.jsx'
import Topic1_6 from './pages/Levels/Level1/Topic1_6.jsx'
import Topic1_7 from './pages/Levels/Level1/Topic1_7.jsx'
import Topic1_8 from './pages/Levels/Level1/Topic1_8.jsx'
// Level 2 Topics
import Topic2_1 from './pages/Levels/Level2/Topic2_1.jsx'
import Topic2_2 from './pages/Levels/Level2/Topic2_2.jsx'
import Topic2_3 from './pages/Levels/Level2/Topic2_3.jsx'
import Topic2_4 from './pages/Levels/Level2/Topic2_4.jsx'
import Topic2_5 from './pages/Levels/Level2/Topic2_5.jsx'
import Topic2_6 from './pages/Levels/Level2/Topic2_6.jsx'
import Topic2_7 from './pages/Levels/Level2/Topic2_7.jsx'
import Topic2_8 from './pages/Levels/Level2/Topic2_8.jsx'
// Level 3 Topics
import Topic3_1 from './pages/Levels/Level3/Topic3_1.jsx'
import Topic3_2 from './pages/Levels/Level3/Topic3_2.jsx'
import Topic3_3 from './pages/Levels/Level3/Topic3_3.jsx'
import Topic3_4 from './pages/Levels/Level3/Topic3_4.jsx'
import Topic3_5 from './pages/Levels/Level3/Topic3_5.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />

        {/* Level 1 Topic Routes */}
        <Route path="/level1/Topic1_1" element={<Topic1_1 />} />
        <Route path="/level1/Topic1_2" element={<Topic1_2 />} />
        <Route path="/level1/Topic1_3" element={<Topic1_3 />} />
        <Route path="/level1/Topic1_4" element={<Topic1_4 />} />
        <Route path="/level1/Topic1_5" element={<Topic1_5 />} />
        <Route path="/level1/Topic1_6" element={<Topic1_6 />} />
        <Route path="/level1/Topic1_7" element={<Topic1_7 />} />
        <Route path="/level1/Topic1_8" element={<Topic1_8 />} />

        {/* Level 2 Topic Routes */}
        <Route path="/level2/Topic2_1" element={<Topic2_1 />} />
        <Route path="/level2/Topic2_2" element={<Topic2_2 />} />
        <Route path="/level2/Topic2_3" element={<Topic2_3 />} />
        <Route path="/level2/Topic2_4" element={<Topic2_4 />} />
        <Route path="/level2/Topic2_5" element={<Topic2_5 />} />
        <Route path="/level2/Topic2_6" element={<Topic2_6 />} />
        <Route path="/level2/Topic2_7" element={<Topic2_7 />} />
        <Route path="/level2/Topic2_8" element={<Topic2_8 />} />

        {/* Level 3 Topic Routes */}
        <Route path="/level3/Topic3_1" element={<Topic3_1 />} />
        <Route path="/level3/Topic3_2" element={<Topic3_2 />} />
        <Route path="/level3/Topic3_3" element={<Topic3_3 />} />
        <Route path="/level3/Topic3_4" element={<Topic3_4 />} />
        <Route path="/level3/Topic3_5" element={<Topic3_5 />} />
      </Routes>
    </Router>
  )
}

export default App
