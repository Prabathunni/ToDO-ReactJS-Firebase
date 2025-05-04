import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <div>
      <Navbar className="bg-dark p-3">
        <Container>
          <Navbar.Brand className='text-light'>
            <i class="fa-solid fa-pen-to-square text-light fa-xl"></i><span className='ms-1'>ToDo</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

    </div>
  )
}

export default Header