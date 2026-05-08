import { logoutAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="outline">
        Logout
      </Button>
    </form>
  );
}
