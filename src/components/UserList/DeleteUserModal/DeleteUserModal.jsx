import React from "react";
import { Modal, Button } from "react-bootstrap";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const DELETE_USER = gql`
  mutation deleteUserMutation($id: ID!) {
    deleteUser(id: $id) {
      email
    }
  }
`;

const DeleteUserModal = (props) => {
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDeleteUser = () => {
    deleteUser({
      variables: {
        id: props.userData.id,
      },
    }).then(() => {
      props.refetch();
      props.setShow(false);
    });
  };

  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header>
        Esta seguro de eliminar a {props.userData.email} con {props.userData.id}
      </Modal.Header>
      <Modal.Footer>
        <Button variant="dark" onClick={() => props.setShow(false)}>
          Close
        </Button>
        <Button variant="success" onClick={handleDeleteUser}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
