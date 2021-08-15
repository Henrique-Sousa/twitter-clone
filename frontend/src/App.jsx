import { Component } from 'react';
import Feed from './components/Feed';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

class App extends Component {
  constructor() {
    super();
    this.apiURL = 'http://127.0.0.1:3001';
  }

  render() {
    return (
      <>
        <Navbar />
        <Feed apiURL={this.apiURL} />
        <Sidebar />
      </>
    );
  }
}

export default App;
