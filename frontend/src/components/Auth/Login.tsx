// import axios from "axios";
// import React, { useState } from "react";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:3001/api/v1/users/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       if (res.status === 200) {
//         console.log("successfull");
//       }
//     } catch (err: any) {
//       console.error(err);
//     }
//   }

//   return (
//     <>
//       <div></div>
//     </>
//   );
// };
