import React from 'react';
import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';

export default function ModalC() {
    const {isShowModal, setIsShowModal} = useContext(MyContext);
  return (
    <>
      <Modal show={isShowModal}>
        <Modal.Header>
          <Modal.Title>React Modal Popover Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>setIsShowModal(false)}>
            <Link to={'/'}  >To Home Page</Link>
          </Button>
          <Button variant="dark" onClick={()=>setIsShowModal(false)}>
          <Link to={'/MyAccount'}>To Your Account</Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
