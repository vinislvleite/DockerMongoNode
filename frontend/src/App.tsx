import { useEffect, useState } from "react";
import { getUsers, getUserCount, createUser, updateUser, deleteUser } from "./api";
import "./App.css"
import type { User } from "./api";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState(0);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const load = () => {
    getUsers().then(setUsers);
    getUserCount().then(setCount);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!nome || !email || !cpf) return;
    const data = { nome, email, cpf, descricao };
    if (editId) {
      await updateUser(editId, data);
      setEditId(null);
    } else {
      await createUser(data);
    }
    setNome("");
    setEmail("");
    setCpf("");
    setDescricao("");
    load();
  };

  const handleEdit = (user: User) => {
    setEditId(user._id);
    setNome(user.nome);
    setEmail(user.email);
    setCpf(user.cpf);
    setDescricao(user.descricao || "");
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    load();
  };

  return (
  <div>
    <h1>Usuários ({count})</h1>
    <div className="form">
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
      <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
      <button onClick={handleSave}>{editId ? "Salvar" : "Adicionar"}</button>
    </div>
    <ul className="list">
      {users.map(u => (
        <li key={u._id}>
          <div className="info">
            <strong>{u.nome}</strong>
            <span>{u.email} · {u.cpf}</span>
          </div>
          <div className="actions">
            <button className="btn-edit" onClick={() => handleEdit(u)}>Editar</button>
            <button className="btn-delete" onClick={() => handleDelete(u._id)}>x</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
}