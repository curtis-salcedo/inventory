import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const businessItems = [
  {
    id: 1,
    name: 'Business 1',
    address: 'Address 1',
    phone_number: 'Phone Number 1',
    email: 'Email 1',
  },
  {
    id: 2,
    name: 'Business 2',
    address: 'Address 2',
    phone_number: 'Phone Number 2',
    email: 'Email 2',
  },
]

const categoryItems = [
  {
    id: 1,
    name: 'Category 1',
    description: 'Description 1',
    business: {
      id: 1,
      name: 'Business 1',
    },
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      categoryList: categoryItems,
    };
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

renderCategories = () => {
  const { viewCompleted } = this.state;
  const newCategory = this.state.categoryList.filter(
    (category) => category.completed === viewCompleted
  );

  return newCategory.map((category) => (
    <li
      key={category.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span
        className={`category-title mr-2 ${
          this.state.viewCompleted ? "completed-category" : ""
        }`}
        title={category.description}
      >
        {category.name}
      </span>
      <span>
        <button
          onClick={() => this.editCategory(category)}
          className="btn btn-secondary mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => this.handleDelete(category)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </span>
    </li>
  ))
}

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Businesses</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button className="btn btn-primary">Add Business</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderCategories()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
