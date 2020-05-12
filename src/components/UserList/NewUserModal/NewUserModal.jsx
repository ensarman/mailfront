import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_DOMAINS = gql`
  query {
    allDomains {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation createUserMutation(
    $domain: Int!
    $email: String!
    $password: String!
    $quota: Int!
  ) {
    createUser(
      domain: $domain
      email: $email
      password: $password
      quota: $quota
    ) {
      id
      email
      domain
      quota
      password
    }
  }
`;

const NewUserModal = (props) => {
  const { loading, error, data } = useQuery(ALL_DOMAINS);
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({
      variables: {
        domain: event.target.domainSelect.value,
        email: event.target.email.value,
        password: event.target.password.value,
        quota: event.target.quota.value,
      },
    }).then(() => {
      props.setShow(false);
    });
  };

  let modalBody;
  if (loading) modalBody = <p>Cargando</p>;
  else if (error) modalBody = <p>error</p>;
  else {
    let domainSelect = (
      <Form.Group controlId="domainSelect">
        <Form.Label>Dominio</Form.Label>
        <Form.Control as="select">
          {data.allDomains.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
    modalBody = (
      <form onSubmit={handleSubmit}>
        {domainSelect}
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="email" id="email" />
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" id="password" />
        <Form.Label>Quota</Form.Label>
        <Form.Control type="number" id="quota" />

        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.setShow(false)}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary" id="saveButton">
            Guardar
          </Button>
        </Modal.Footer>
      </form>
    );
  }

  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header>Crear Nuevo Usuario</Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
    </Modal>
  );
};

export default NewUserModal;
