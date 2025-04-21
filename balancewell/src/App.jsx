// import { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Header from './components/header/header.jsx'
// import Home from './pages/home/home.jsx'
// import Housing from './pages/housing/housing.jsx'
// import Education from './pages/education/education.jsx'
// import EduMenu from './pages/eduMenu/eduMenu.jsx'
// import Sustainability from './pages/sustainability/sustainability.jsx'
// import News from './pages/news/news.jsx'
// import Quiz from './pages/quiz/quiz.jsx'
// import TopicPageWrapper from './components/TopicNavigation/TopicPageWrapper.jsx'
// import Password from './pages/password/password.jsx'
// import ProtectedRoute from './components/projectedRoute.jsx'
// // Level 1 Topics
// import Topic1_1 from './pages/Levels/Level1/Topic1_1.jsx'
// import Topic1_2 from './pages/Levels/Level1/Topic1_2.jsx'
// import Topic1_3 from './pages/Levels/Level1/Topic1_3.jsx'
// import Topic1_4 from './pages/Levels/Level1/Topic1_4.jsx'
// import Topic1_5 from './pages/Levels/Level1/Topic1_5.jsx'
// import Topic1_6 from './pages/Levels/Level1/Topic1_6.jsx'
// import Topic1_7 from './pages/Levels/Level1/Topic1_7.jsx'
// import Topic1_8 from './pages/Levels/Level1/Topic1_8.jsx'
// // Level 2 Topics
// import Topic2_1 from './pages/Levels/Level2/Topic2_1.jsx'
// import Topic2_2 from './pages/Levels/Level2/Topic2_2.jsx'
// import Topic2_3 from './pages/Levels/Level2/Topic2_3.jsx'
// import Topic2_4 from './pages/Levels/Level2/Topic2_4.jsx'
// import Topic2_5 from './pages/Levels/Level2/Topic2_5.jsx'
// import Topic2_6 from './pages/Levels/Level2/Topic2_6.jsx'
// import Topic2_7 from './pages/Levels/Level2/Topic2_7.jsx'
// import Topic2_8 from './pages/Levels/Level2/Topic2_8.jsx'
// // Level 3 Topics
// import Topic3_1 from './pages/Levels/Level3/Topic3_1.jsx'
// import Topic3_2 from './pages/Levels/Level3/Topic3_2.jsx'
// import Topic3_3 from './pages/Levels/Level3/Topic3_3.jsx'
// import Topic3_4 from './pages/Levels/Level3/Topic3_4.jsx'
// import Topic3_5 from './pages/Levels/Level3/Topic3_5.jsx'
// import Topic3_6 from './pages/Levels/Level3/Topic3_6.jsx'
// import Topic3_7 from './pages/Levels/Level3/Topic3_7.jsx'
// import Topic3_8 from './pages/Levels/Level3/Topic3_8.jsx'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   // Wrap Topic component with TopicPageWrapper
//   const wrapTopicComponent = (Component) => {
//     return (
//       <TopicPageWrapper>
//         <Component />
//       </TopicPageWrapper>
//     );
//   };

//   return (
//     <Router>
//       <Header />
//       <Routes>
//       <Route path="/" element={<Password />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/sustainability" element={<Sustainability />} />
//         <Route path="/housing" element={<Housing />} />
//         <Route path="/education" element={<Education />} />
//         <Route path="/eduMenu" element={<EduMenu />} />
//         <Route path="/news" element={<News />} />
//         <Route path="/quiz" element={<Quiz />} />

//         {/* Level 1 Topic Routes */}
//         <Route path="/level1/Topic1_1" element={wrapTopicComponent(Topic1_1)} />
//         <Route path="/level1/Topic1_2" element={wrapTopicComponent(Topic1_2)} />
//         <Route path="/level1/Topic1_3" element={wrapTopicComponent(Topic1_3)} />
//         <Route path="/level1/Topic1_4" element={wrapTopicComponent(Topic1_4)} />
//         <Route path="/level1/Topic1_5" element={wrapTopicComponent(Topic1_5)} />
//         <Route path="/level1/Topic1_6" element={wrapTopicComponent(Topic1_6)} />
//         <Route path="/level1/Topic1_7" element={wrapTopicComponent(Topic1_7)} />
//         <Route path="/level1/Topic1_8" element={wrapTopicComponent(Topic1_8)} />

//         {/* Level 2 Topic Routes */}
//         <Route path="/level2/Topic2_1" element={wrapTopicComponent(Topic2_1)} />
//         <Route path="/level2/Topic2_2" element={wrapTopicComponent(Topic2_2)} />
//         <Route path="/level2/Topic2_3" element={wrapTopicComponent(Topic2_3)} />
//         <Route path="/level2/Topic2_4" element={wrapTopicComponent(Topic2_4)} />
//         <Route path="/level2/Topic2_5" element={wrapTopicComponent(Topic2_5)} />
//         <Route path="/level2/Topic2_6" element={wrapTopicComponent(Topic2_6)} />
//         <Route path="/level2/Topic2_7" element={wrapTopicComponent(Topic2_7)} />
//         <Route path="/level2/Topic2_8" element={wrapTopicComponent(Topic2_8)} />

//         {/* Level 3 Topic Routes */}
//         <Route path="/level3/Topic3_1" element={wrapTopicComponent(Topic3_1)} />
//         <Route path="/level3/Topic3_2" element={wrapTopicComponent(Topic3_2)} />
//         <Route path="/level3/Topic3_3" element={wrapTopicComponent(Topic3_3)} />
//         <Route path="/level3/Topic3_4" element={wrapTopicComponent(Topic3_4)} />
//         <Route path="/level3/Topic3_5" element={wrapTopicComponent(Topic3_5)} />
//         <Route path="/level3/Topic3_6" element={wrapTopicComponent(Topic3_6)} />
//         <Route path="/level3/Topic3_7" element={wrapTopicComponent(Topic3_7)} />
//         <Route path="/level3/Topic3_8" element={wrapTopicComponent(Topic3_8)} />
//       </Routes>
//     </Router>
//   )
// }

// export default App


import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Header from './components/header/header.jsx';
import Home from './pages/home/home.jsx';
import Housing from './pages/housing/housing.jsx';
import Education from './pages/education/education.jsx';
import EduMenu from './pages/eduMenu/eduMenu.jsx';
import Sustainability from './pages/sustainability/sustainability.jsx';
import News from './pages/news/news.jsx';
import Quiz from './pages/quiz/quiz.jsx';
import TopicPageWrapper from './components/TopicNavigation/TopicPageWrapper.jsx';
import Password from './pages/password/password.jsx';
import ProtectedRoute from './components/projectedRoute.jsx';
import Events from './pages/events/events.jsx';

// Level 1 Topics
import Topic1_1 from './pages/Levels/Level1/Topic1_1.jsx';
import Topic1_2 from './pages/Levels/Level1/Topic1_2.jsx';
import Topic1_3 from './pages/Levels/Level1/Topic1_3.jsx';
import Topic1_4 from './pages/Levels/Level1/Topic1_4.jsx';
import Topic1_5 from './pages/Levels/Level1/Topic1_5.jsx';
import Topic1_6 from './pages/Levels/Level1/Topic1_6.jsx';
import Topic1_7 from './pages/Levels/Level1/Topic1_7.jsx';
import Topic1_8 from './pages/Levels/Level1/Topic1_8.jsx';

// Level 2 Topics
import Topic2_1 from './pages/Levels/Level2/Topic2_1.jsx';
import Topic2_2 from './pages/Levels/Level2/Topic2_2.jsx';
import Topic2_3 from './pages/Levels/Level2/Topic2_3.jsx';
import Topic2_4 from './pages/Levels/Level2/Topic2_4.jsx';
import Topic2_5 from './pages/Levels/Level2/Topic2_5.jsx';
import Topic2_6 from './pages/Levels/Level2/Topic2_6.jsx';
import Topic2_7 from './pages/Levels/Level2/Topic2_7.jsx';
import Topic2_8 from './pages/Levels/Level2/Topic2_8.jsx';

// Level 3 Topics
import Topic3_1 from './pages/Levels/Level3/Topic3_1.jsx';
import Topic3_2 from './pages/Levels/Level3/Topic3_2.jsx';
import Topic3_3 from './pages/Levels/Level3/Topic3_3.jsx';
import Topic3_4 from './pages/Levels/Level3/Topic3_4.jsx';
import Topic3_5 from './pages/Levels/Level3/Topic3_5.jsx';
import Topic3_6 from './pages/Levels/Level3/Topic3_6.jsx';
import Topic3_7 from './pages/Levels/Level3/Topic3_7.jsx';
import Topic3_8 from './pages/Levels/Level3/Topic3_8.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== '/'; // 登录页不显示 Header

  const wrapTopicComponent = (Component) => {
    return (
      <TopicPageWrapper>
        <Component />
      </TopicPageWrapper>
    );
  };

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Password />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/sustainability" element={<ProtectedRoute><Sustainability /></ProtectedRoute>} />
        <Route path="/housing" element={<ProtectedRoute><Housing /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
        <Route path="/eduMenu" element={<ProtectedRoute><EduMenu /></ProtectedRoute>} />
        <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />

        {/* Level 1 */}
        <Route path="/level1/Topic1_1" element={<ProtectedRoute>{wrapTopicComponent(Topic1_1)}</ProtectedRoute>} />
        <Route path="/level1/Topic1_2" element={<ProtectedRoute>{wrapTopicComponent(Topic1_2)}</ProtectedRoute>} />
        <Route path="/level1/Topic1_3" element={<ProtectedRoute>{wrapTopicComponent(Topic1_3)}</ProtectedRoute>} />
        <Route path="/level1/Topic1_4" element={<ProtectedRoute>{wrapTopicComponent(Topic1_4)}</ProtectedRoute>} />
        <Route path="/level1/Topic1_5" element={<ProtectedRoute>{wrapTopicComponent(Topic1_5)}</ProtectedRoute>} />
        <Route path="/level1/Topic1_6" element={<ProtectedRoute>{wrapTopicComponent(Topic1_6)}</ProtectedRoute>} />
        <Route path="/level1/Topic1_7" element={<ProtectedRoute>{wrapTopicComponent(Topic1_7)}</ProtectedRoute>} />
        <Route path="/level1/Topic1_8" element={<ProtectedRoute>{wrapTopicComponent(Topic1_8)}</ProtectedRoute>} />

        {/* Level 2 */}
        <Route path="/level2/Topic2_1" element={<ProtectedRoute>{wrapTopicComponent(Topic2_1)}</ProtectedRoute>} />
        <Route path="/level2/Topic2_2" element={<ProtectedRoute>{wrapTopicComponent(Topic2_2)}</ProtectedRoute>} />
        <Route path="/level2/Topic2_3" element={<ProtectedRoute>{wrapTopicComponent(Topic2_3)}</ProtectedRoute>} />
        <Route path="/level2/Topic2_4" element={<ProtectedRoute>{wrapTopicComponent(Topic2_4)}</ProtectedRoute>} />
        <Route path="/level2/Topic2_5" element={<ProtectedRoute>{wrapTopicComponent(Topic2_5)}</ProtectedRoute>} />
        <Route path="/level2/Topic2_6" element={<ProtectedRoute>{wrapTopicComponent(Topic2_6)}</ProtectedRoute>} />
        <Route path="/level2/Topic2_7" element={<ProtectedRoute>{wrapTopicComponent(Topic2_7)}</ProtectedRoute>} />
        <Route path="/level2/Topic2_8" element={<ProtectedRoute>{wrapTopicComponent(Topic2_8)}</ProtectedRoute>} />

        {/* Level 3 */}
        <Route path="/level3/Topic3_1" element={<ProtectedRoute>{wrapTopicComponent(Topic3_1)}</ProtectedRoute>} />
        <Route path="/level3/Topic3_2" element={<ProtectedRoute>{wrapTopicComponent(Topic3_2)}</ProtectedRoute>} />
        <Route path="/level3/Topic3_3" element={<ProtectedRoute>{wrapTopicComponent(Topic3_3)}</ProtectedRoute>} />
        <Route path="/level3/Topic3_4" element={<ProtectedRoute>{wrapTopicComponent(Topic3_4)}</ProtectedRoute>} />
        <Route path="/level3/Topic3_5" element={<ProtectedRoute>{wrapTopicComponent(Topic3_5)}</ProtectedRoute>} />
        <Route path="/level3/Topic3_6" element={<ProtectedRoute>{wrapTopicComponent(Topic3_6)}</ProtectedRoute>} />
        <Route path="/level3/Topic3_7" element={<ProtectedRoute>{wrapTopicComponent(Topic3_7)}</ProtectedRoute>} />
        <Route path="/level3/Topic3_8" element={<ProtectedRoute>{wrapTopicComponent(Topic3_8)}</ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
