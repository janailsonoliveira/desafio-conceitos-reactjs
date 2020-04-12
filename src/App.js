import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      console.log(response.data)
      setRepositories(response.data)
    });

  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "React Native",
      techs: ["React", "Node.js"],
    })
    
    const repository = response.data
    setRepositories([...repositories, repository ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const repository = await api.get('/repositories')
    setRepositories([],...repository.data)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
