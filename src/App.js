import { useEffect, useState, useMemo } from "react";
import "./App.css";
import Button from "./Button";

export default function App() {
    // Variáveis de estado
    const [input, setInput] = useState("");
    const [tarefas, setTarefas] = useState([]);
    const [error, setError] = useState(""); // Estado para o erro

    // Carrega as tarefas do localStorage
    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    // Adiciona uma tarefa
    function handleAddTarefa() {
        // Erro para ao inserir tarefas vazias
        if (input.trim() === "") {
            setError("Insira uma tarefa"); // Atualiza o erro
            setInput(""); // Limpa o input
            
        //else para quando enviar uma tarefa valida
        } else {
            setTarefas([...tarefas, input]); // Adiciona a nova tarefa
            setError(""); // Limpa o erro
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
                        <Button onClick={() => handleRemoveTarefa(index)} className="RemoveButton"></Button>
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

            {error && (
                <p style={{
                    color: 'red',
                    fontWeight: 'bold',
                    marginTop: '1px', 
                    fontSize: '14px'  
                }}>
                    {error}
                </p>
            )}

            <Button onClick={handleAddTarefa} className="Button1">
                Adicionar Tarefa
            </Button>

            <Button onClick={handleRemoveAllTarefas} className="Button2">
                Remover tudo
            </Button>
        </div>
    );
}
