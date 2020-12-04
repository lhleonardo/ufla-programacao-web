import React, { useState, useEffect, useCallback } from "react";
import { api } from "../../services/api";
import { Main, FormSection, TableSection } from "./styles";

interface Task {
  id: string;
  name: string;
  description: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadTasksFromAPI() {
      const response = await api.get<Task[]>("/tasks");

      setTasks(response.data);
    }

    loadTasksFromAPI();
  }, []);

  const onSubmitForm = useCallback(
    async (event: any) => {
      event.preventDefault();

      const data: Omit<Task, "id"> = {
        name: event.target.name.value,
        description: event.target.description.value,
      };

      const response = await api.post<Task>("/tasks", data);

      setTasks([...tasks, response.data]);
    },
    [tasks]
  );

  return (
    <Main>
      <FormSection>
        <h2>Cadastro de tarefas</h2>
        <form onSubmit={onSubmitForm}>
          <label>
            Nome da Tarefa
            <input type="text" name="name" />
          </label>

          <label>
            Descrição da tarefa
            <input type="text" name="description" />
          </label>

          <input type="submit" value="Cadastrar" />
        </form>
      </FormSection>
      <hr />
      <TableSection>
        <h2>Tarefas Cadastradas</h2>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableSection>
    </Main>
  );
}
