import { googleLoginAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/Button";

export function GoogleButton() {
  return (
    <form action={googleLoginAction}>
      <Button type="submit" variant="outline" className="w-full">
        Continue with Google
      </Button>
    </form>
  );
}
