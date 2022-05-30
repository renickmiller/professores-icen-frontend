import React from 'react';
import styles from './Professor.module.css';
import { useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function Professor() {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className={styles.container}>
      <h1>Professor</h1>
      <div className={styles.lineVertical}></div>
      <div className={styles.infos}>
        <img src={location.state.imglink} alt="Professor" />

        <h2>{location.state.nome}</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>CITAÇÕES</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Todos</th>
              <th>Desde 2017</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Citaçoes</td>
              <td>{location.state.citacoes}</td>
              <td>{location.state.citacoes_2017}</td>
            </tr>
            <tr>
              <td>Índice h</td>
              <td>{location.state.ih}</td>
              <td>{location.state.ih_2017}</td>
            </tr>
            <tr>
              <td>Índice i10</td>
              <td>{location.state.i10}</td>
              <td>{location.state.i10_2017}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Professor;
