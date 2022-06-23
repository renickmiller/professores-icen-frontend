import styles from './Nav.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function Nav() {
  let [nomesTotal, setNomesTotal] = useState([]); //estado que armazena os dados do fetch
  const [order, setOrder] = useState(1); //estado que diz se a lista esta em ordem cresc ou decresc
  const [colum, setColum] = useState('nome');

  const handleOrder = (fieldName) => {
    setOrder(-order);
    setColum(fieldName);
  };

  nomesTotal = nomesTotal.sort((a, b) => {
    return a[colum] < b[colum] ? -order : order;
  });

  useEffect(() => {
    fetch('https://professores-backend.herokuapp.com/professores')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setNomesTotal(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={styles.newBody}>
        <Table
          striped
          bordered
          hover
          variant="dark"
          size="sm"
          className={styles.table}
        >
          <thead>
            <tr>
              <th onClick={(e) => handleOrder('idprofessores')}>#</th>
              <th onClick={(e) => handleOrder('nome')}>Professor</th>
              <th onClick={(e) => handleOrder('citacoes')}>Citaçoes</th>
              <th onClick={(e) => handleOrder('ih')}>Índice h</th>
              <th onClick={(e) => handleOrder('i10')}>Índice i10</th>
              <th onClick={(e) => handleOrder('citacoes_2017')}>
                Citaçoes desde 2017
              </th>
              <th onClick={(e) => handleOrder('ih_2017')}>
                Índice h desde 2017
              </th>
              <th onClick={(e) => handleOrder('i10_2017')}>
                Índice i10 desde 2017
              </th>
            </tr>
          </thead>
          <tbody>
            {nomesTotal.map(
              ({
                idprofessores,
                nome,
                citacoes,
                ih,
                i10,
                citacoes_2017,
                ih_2017,
                i10_2017,
              }) => {
                return (
                  <tr key={idprofessores}>
                    <td>{idprofessores}</td>
                    <td>{nome}</td>
                    <td>{citacoes}</td>
                    <td>{ih}</td>
                    <td>{i10}</td>
                    <td>{citacoes_2017}</td>
                    <td>{ih_2017}</td>
                    <td>{i10_2017}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Nav;
