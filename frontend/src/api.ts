const API_URL = "http://localhost:3001/api/users";

export interface User {
  _id: string;
  nome: string;
  email: string;
  cpf: string;
  descricao?: string;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getUserCount(): Promise<number> {
  const res = await fetch(`${API_URL}/count`);
  const data = await res.json();
  return data.count;
}

export async function createUser(data: Partial<User>): Promise<User> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUser(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}