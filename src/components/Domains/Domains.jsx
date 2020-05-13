import React, { useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Loading from "../Loading/Loading";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import NewDomainModal from "./NewDomainModal/NewDomainModal";

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
  const { loading, error, data, refetch } = useQuery(ALL_DOMAINS);

  const [show, setShow] = useState(false);

  if (loading) return <Loading />;
  if (error) return <ErrorNotification error={error} />;

  return (
    <Container className="my-4">
      <NewDomainModal show={show} setShow={setShow} refetch={refetch} />
      <Button onClick={() => setShow(true)}>Nuevo Dominio</Button>
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
              <tr key={domain.id}>
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
