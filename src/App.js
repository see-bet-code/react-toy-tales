import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const TOYS_URL = 'http://localhost:3000/toys'

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch(TOYS_URL)
    .then(r => r.json())
    .then(toys => this.setState({ toys: toys }))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  postNewToy = toyData => {
    fetch(TOYS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(toyData)
    })
    .then(r => r.json())
    .then(newToy => this.setState({toys: [...this.state.toys, newToy]}))
  }

  handleDeleteToy = id => {
    fetch(`${TOYS_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(() => this.setState({toys: [...this.state.toys].filter(t => t.id !== id)}))
  }

  incrementLikes = id => {
    const updToys = [...this.state.toys]
    const oldToy = updToys.find(t => t.id === id)
    fetch(`${TOYS_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({likes: ++oldToy.likes})
    })
    .then(r => r.json())
    .then(updToy => this.setState({toys: [...this.state.toys].map(toy => (toy.id === id) ? updToy : toy)}))
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm postNewToy={this.postNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleDeleteToy={this.handleDeleteToy} incrementLikes={this.incrementLikes}/>
      </>
    );
  }

}

export default App;
