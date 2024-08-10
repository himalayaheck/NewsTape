// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {

//   const boxShadowStyle = {
//     boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
//   };

//   return (
//     <div>
//       <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary " style={boxShadowStyle}>
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/">NewsTape</Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link className="nav-link" aria-current="page" to="/">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/business">Business</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/entertainment">Entertainment</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/health">Health</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/science">Science</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/sports">Sports</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/general">General</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/technology">Technology</Link>
//               </li>
//             </ul>
//             <div class="form-check form-switch">
//               <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
//               <label className="form-check-label"  for="flexSwitchCheckDefault">Dark Mode</label>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }


// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const boxShadowStyle = {
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
  };

  return (
    <div>
      <nav className={`navbar fixed-top navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'bg-body-tertiary'}`} style={boxShadowStyle}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsTape</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business">Business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">Health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">Science</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general">General</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">Technology</Link>
              </li>
            </ul>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isDarkMode} onChange={toggleDarkMode} />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

