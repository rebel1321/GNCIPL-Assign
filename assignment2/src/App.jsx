import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplication from './pages/ViewApplication';
import Application from './pages/Application';
import ApplyJob from './pages/ApplyJob';

function App() {
  return (
    <div className="min-h-screen gradient-primary">
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-job" element={<ManageJobs />} />
            <Route path="view-applications" element={<ViewApplication />} />
          </Route>
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-slate-800 text-white border border-slate-700"
        />
      </div>
    </div>
  );
}

export default App;
