import React from 'react'
import { Container } from 'react-bootstrap'

import Signup from './components/Signup'

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: '400px'}}>
        <Signup />
      </div>
    </Container>
  );
}

export default App;
