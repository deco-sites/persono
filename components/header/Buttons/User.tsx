import Icon from "deco-sites/persono/components/ui/Icon.tsx";
import { state as storeState } from "deco-sites/persono/packs/hooks/context.ts";

const { user, loading } = storeState;

const User = () => {
  return (
    <a
      class="btn btn-circle hover:text-primary btn-sm btn-ghost flex items-center justify-center"
      href={user.value ? "/perfil" : "/login"}
      aria-label="área logada"
    >
      {loading.value
        ? <span class="loading loading-spinner" />
        : <Icon id="User" size={24} strokeWidth={0.4} />}
    </a>
  );
};

export default User;
