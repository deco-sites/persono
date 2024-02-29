import Icon from "deco-sites/persono/components/ui/Icon.tsx";

const User = () => {
  return (
    <a
      class="btn btn-circle hover:text-primary btn-sm btn-ghost flex items-center justify-center"
      href="/perfil/meus-pedidos"
      aria-label="Log in"
    >
      <Icon id="User" size={24} strokeWidth={0.4} />
    </a>
  );
};

export default User;
