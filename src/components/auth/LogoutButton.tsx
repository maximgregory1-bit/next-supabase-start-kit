import { logoutAction } from "@/actions/auth.actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white">
        Logout
      </button>
    </form>
  );
}