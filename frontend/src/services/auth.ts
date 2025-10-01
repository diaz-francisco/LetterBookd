export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:3001/api/v1/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // send/receive cookies
    body: JSON.stringify({ email, password }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    console.error(err);
  }

  if (!res.ok) {
    const message = data?.message || "Login failed";
    throw new Error(message);
  }
  return data;
}

export async function logout() {
  const res = await fetch("http://localhost:3001/api/v1/users/logout", {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
}
