import styles from './Nav.module.css';
import { GoSearch } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function Nav() {
  const [nomesTotal, setNomesTotal] = useState([]); //estado que armazena os dados do fetch
  const [inputSearch, setInputSearch] = useState('');
  const [filterSearch, setFilterSearch] = useState([]);
  let navigate = useNavigate();

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

  const handleFilter = (e) => {
    e.preventDefault(e);
    setInputSearch(e.target.value);

    const newFilter = nomesTotal.filter((value) => {
      return value.nome.toLowerCase().includes(inputSearch.toLocaleLowerCase());
    });
    setFilterSearch(newFilter);
  };

  useEffect(() => {
    if (inputSearch === '') {
      setFilterSearch([]);
    }
  }, [inputSearch]);

  const resultList = filterSearch.map((values) => {
    return (
      <div className={styles.dataItem}>
        <li
          key={values.idprofessores}
          onClick={() => handleClickAutoComplete(values)}
        >
          <IconContext.Provider value={{ color: '#B8B8B8', size: '30px' }}>
            <GoSearch />
          </IconContext.Provider>
          <span>{values.nome}</span>
        </li>
      </div>
    );
  });

  function handleClickAutoComplete(value) {
    setInputSearch(value.nome);
    navigate('/professor', { state: value });
  }

  return (
    <>
      <div className={styles.newBody}>
        <div className={styles.content}>
          <IconContext.Provider value={{ color: '#B8B8B8', size: '30px' }}>
            <GoSearch />
            <input
              type="text"
              id="professor"
              placeholder="Buscar Professor ..."
              value={inputSearch}
              onChange={handleFilter}
            />
          </IconContext.Provider>
        </div>

        {filterSearch !== 0 && (
          <div className={styles.dataResult}>
            <ul>{resultList}</ul>
          </div>
        )}

        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Nav;
