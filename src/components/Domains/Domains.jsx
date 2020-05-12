import React from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Loading from "../Loading/Loading";
import ErrorNotification from "../ErrorNotification/ErrorNotification";

const ALL_DOMAINS = gql`
  query {
    allDomains {
      id
      name
      domainadminSet {
        business {
          name
        }
      }
    }
  }
`;

const Domains = () => {
  const { loading, error, data } = useQuery(ALL_DOMAINS);

  if (loading) return <Loading />;
  if (error) return <ErrorNotification error={error} />;

  return (
    <Container className="my-4">
      <Button>Nuevo Usuario</Button>
      <Table hover className="mt-3">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>dominio</th>
            <th>sisUser</th>
          </tr>
        </thead>
        <tbody>
          {data.allDomains.map((domain) => {
            return (
              <tr>
                <td>{domain.id}</td>
                <td>{domain.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Domains;
