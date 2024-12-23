import { useState, useMemo } from "react";
import "./App.css";
import Button from "./Button";

export default function App() {
    // Variáveis de estado
    const [input, setInput] = useState(""); // Estado para o input
    const [tarefas, setTarefas] = useState([]); // Estado paras tarefas
    const [error, setError] = useState(""); // Estado para o erro

    // Adiciona uma tarefa
   function handleAddTarefa() {
     try {
        if (input.trim() !== "") {
            setTarefas([...tarefas, input]); //Envia a tarefa
            setInput(""); //Limpa o input ao enviar o tarefa
            setError(""); // Limpa o erro caso o input seja válido
        } else {
            throw new Error("Insira uma tarefa"); // Lança o erro caso o input esteja vazio
        }
         
        } catch (error) {
           console.error("Erro:", error.message); // Exibe o erro no console para debug
           setError(error.message); // Exibe a mensagem de erro na tela
        }
      }


    // Remove uma tarefa
    function handleRemoveTarefa(index) {
        const updatedTarefas = [...tarefas];
        updatedTarefas.splice(index, 1);
        setTarefas(updatedTarefas);
    }

    // Remove todas as tarefas de uma vez
    function handleRemoveAllTarefas() {
        setTarefas([]);
    }

    // useMemo para contar quantas tarefas estão em execução
    const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

    // Conteúdo da página
    return (
        <div className="App">
            <h1>Lista de Tarefas</h1>

            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index}>
                        {tarefa}
                        <Button onClick={handleRemoveTarefa} className="RemoveButton"></Button>
                    </li>
                ))}
            </ul>

            <p>{totalTarefas} Tarefas</p>

            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nova tarefa"
                style={{
                    borderColor: error ? 'red' : '#ccc', 
                }}
            />

             <p style={{
                  color: 'red',
                  fontWeight: 'bold',
                  marginTop: '1px', 
                  fontSize: '14px'
                }}>
                   {error}
              </p>


            <Button onClick={handleAddTarefa} className="Button1">
                Adicionar Tarefa
            </Button>

            <Button onClick={handleRemoveAllTarefas} className="Button2">
                Remover tudo
            </Button>
        </div>
    );
}
