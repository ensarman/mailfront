import React from "react";
import { Modal, Button } from "react-bootstrap";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      email
    }
  }
`;

const DeleteUserModal = (props) => {
  const [deleteUser, { dataDelete }] = useMutation(DELETE_USER);

  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header>
        Esta seguro de eliminar a {props.userData.email}
      </Modal.Header>
    </Modal>
  );
};

export default DeleteUserModal;
