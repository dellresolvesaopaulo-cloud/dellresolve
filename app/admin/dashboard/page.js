import { requireRole } from "../../../lib/requireRole"
import DashboardClient from "./DashboardClient"

export default async function Page() {
  await requireRole(["admin", "tecnico"])

  return <DashboardClient />
}
