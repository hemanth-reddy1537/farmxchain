// // src/RoleSelection.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/RoleSelection.css";

// const roles = [
//   {
//     key: "farmer",
//     label: "Farmer",
//     desc: "Manage crops, stock and sales.",
//     icon: "/images/role-farmer.png",
//   },
//   {
//     key: "distributor",
//     label: "Distributor",
//     desc: "Track orders and inventory.",
//     icon: "/images/role-distributor.png",
//   },
//   {
//     key: "customer",
//     label: "Customer",
//     desc: "Browse products and track your orders.",
//     icon: "/images/role-customer.png",
//   },
//   {
//     key: "admin",
//     label: "Admin",
//     desc: "Monitor all users and analytics.",
//     icon: "/images/role-admin.png",
//   },
// ];

// const RoleSelection = () => {
//   const navigate = useNavigate();

//   const handleSelect = (roleKey) => {
//     navigate(`/login/${roleKey}`);
//   };

//   return (
//     <div className="rs-page-farm">
//       <header className="rs-header">
//         <div className="rs-brand">
//           <img src="/images/farmx-logo.png" alt="FarmX logo" />
//           <span className="rs-brand-name">FarmX</span>
//         </div>

//         <div className="rs-header-actions">
//           <button className="rs-header-chip">Settings</button>
//           <button className="rs-header-chip">Help</button>
//         </div>
//       </header>

//       <main className="rs-main">
//         {/* outer tilted panel */}
//         <div className="rs-tilt-outer">
//           <div className="rs-tilt-inner">
//             <div className="rs-heading-center">
//               <h1>Select your role</h1>
//               <p>Choose how you want to sign in to FarmX.</p>
//             </div>

//             <div className="rs-role-grid-2x2">
//               {roles.map((role) => (
//                 <button
//                   key={role.key}
//                   className="rs-role-slot"
//                   onClick={() => handleSelect(role.key)}
//                 >
//                   <div className="rs-role-pill">
//                     <div className="rs-role-pill-icon">
//                       <img src={role.icon} alt={`${role.label} icon`} />
//                     </div>
//                     <span className="rs-role-pill-label">{role.label}</span>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default RoleSelection;
