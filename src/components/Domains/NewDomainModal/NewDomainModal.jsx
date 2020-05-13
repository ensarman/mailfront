import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Form, Modal, Button } from "react-bootstrap";

const CREATE_DOMAIN = gql`
  mutation newDomainMutation($name: String!) {
    createDomain(name: $name) {
      name
    }
  }
`;

const NewDomainModal = (props) => {
  const [createDomain] = useMutation(CREATE_DOMAIN);

  const handleSubmit = (event) => {
    event.preventDefault();
    createDomain({
      variables: { name: event.target.domainName },
    }).then(() => {
      props.refetch();
      props.setShow(false);
    });
  };

  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header>Nuevo dominio</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Form.Label>Dominio</Form.Label>
          <Form.Input
            type="text"
            placeholder="Nombre del dominio"
            id="domainName"
          />
        </form>
        <Button variant="dark" onClick={() => props.setShow(false)}>
          close
        </Button>
        <Button variant="success">Submit</Button>
      </Modal.Body>
    </Modal>
  );
};

export default NewDomainModal;
