export const USERS = [
  {
    email: "dellassistenciatecnica@gmail.com",
    role: "admin"
  },
  {
    email: "techsupport@dellresolve.com",
    role: "admin"
  },
  {
    email: "tecnico1@gmail.com",
    role: "tecnico"
  }
]

export function getUserRole(email) {
  const user = USERS.find(u => u.email === email)
  return user?.role || null
}

export function isAdmin(email) {
  return getUserRole(email) === "admin"
}

export function isTecnico(email) {
  return getUserRole(email) === "tecnico"
}
