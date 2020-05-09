import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_DOMAINS = gql`
  query {
    allDomains {
      id
      name
    }
  }
`;

const NewUserModal = (props) => {
  //console.log(props.showModal);
  const { loading, error, data } = useQuery(ALL_DOMAINS);
  //const [show, setShow] = useState(show);
  const handleClose = () => props.setShow(false);

  console.log("hola");

  let modalBody;
  if (loading) modalBody = <p>Cargando</p>;
  else if (error) modalBody = <p>error</p>;
  else {
    let select = data.allDomains.map(({ id, name }) => (
      <option key={id} value={id}>
        {name}
      </option>
    ));
    select = (
      <>
        <Form.Label>Dominio</Form.Label>
        <Form.Control as="select">{select}</Form.Control>
      </>
    );
    modalBody = (
      <>
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="email" />
        <Form.Group controlId="exampleForm.ControlSelect1">{select}</Form.Group>
      </>
    );
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header>Crear Nuevo Usuario</Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUserModal;
