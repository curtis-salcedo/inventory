// import React, { Component } from 'react';
// import Modal from "../../components/Modal";
// import './App.css';
// import axios from 'axios';

// // axios CSRF token for Axios Requests
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.xsrfCookieName = "csrftoken";


// const businessItems = [
//   {
//     id: 1,
//     name: 'Business 1',
//     address: 'Address 1',
//     phone_number: 'Phone Number 1',
//     email: 'Email 1',
//   },
//   {
//     id: 2,
//     name: 'Business 2',
//     address: 'Address 2',
//     phone_number: 'Phone Number 2',
//     email: 'Email 2',
//   },
// ]

// const categoryItems = [
//   {
//     id: 1,
//     name: 'Category 1',
//     description: 'Description 1',
//     business: {
//       id: 1,
//       name: 'Business 1',
//     },
//   },
//   {
//     id: 2,
//     name: 'Category 2',
//     description: 'Description 2',
//     business: {
//       id: 1,
//       name: 'Business 2',
//     },
//   },
// ]

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       viewCompleted: false,
//       categoryList: [],
//       modal: false,
//       activeItem: {
//         name: "",
//         description: "",
//       },
//     };
//   }

//   componentDidMount() {
//     this.refreshList();
//   }

//   refreshList = () => {
//     axios
//       .get("/api/category/")
//       .then((res) => this.setState({ categoryList: res.data }))
//       .catch((err) => console.log(err));
//   };

//   toggle = () => {
//     this.setState({ modal: !this.state.modal });
//   };

//   handleSubmit = (category) => {
//     this.toggle();
//     if(category.id) {
//       axios
//         .put(`/api/category/${category.id}/`, category)
//         .then((res) => this.refreshList());
//       return;
//     }
//     axios
//       .post("/api/category/", category)
//       .then((res) => this.refreshList());
//   };

//   handleDelete = (category) => {
//     axios
//       .delete(`/api/category/${category.id}`)
//       .then((res) => this.refreshList());
//   };

//   createCategory = () => {
//     const category = {
//       name: "",
//       description: "",
//       business: 1,
//     };
//     this.setState({ activeItem: category, modal: !this.state.modal });
//   };

//   editCategory = (category) => {
//     this.setState({ activeItem: category, modal: !this.state.modal });
//   };


//   displayCompleted = (status) => {
//     if (status) {
//       return this.setState({ viewCompleted: true });
//     }

//     return this.setState({ viewCompleted: false });
//   };

//   renderCategory = () => {
//     return this.state.categoryList.map((c) => (
//       <li key={c.id}>
//         <span>{c.name}</span>
//         <span>{c.description}</span>
//         <span>
//           <button
//             className="btn btn-secondary mr-2"
//             onClick={() => this.editCategory(c)}
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-danger"
//             onClick={() => this.handleDelete(c)}
//           >
//             Delete
//           </button>
//         </span>
//       </li>
//     ));
//   };
  

//   render() {
//     return (
//       <main className="container">
//         <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">
//               <div className="mb-4">
//                 <button
//                   className="btn btn-primary"
//                   onClick={this.createCategory}
//                 >
//                   Create Category
//                 </button>
//               </div>
//               <ul className="list-group list-group-flush border-top-0">
//                 {this.renderCategory()}
//               </ul>
//             </div>
//           </div>
//         </div>
//         {this.state.modal ? (
//           <Modal
//             activeItem={this.state.activeItem}
//             toggle={this.toggle}
//             onSave={this.handleSubmit}
//           />
//         ) : null}
//       </main>
//     );
//   }
// }


// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// export default App;
