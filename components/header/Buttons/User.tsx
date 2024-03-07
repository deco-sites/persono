import Icon from "deco-sites/persono/components/ui/Icon.tsx";

const User = () => {
  return (
    <a
      class="btn btn-circle hover:text-primary btn-sm btn-ghost flex items-center justify-center"
      href="/perfil/pedidos"
      aria-label="área logada"
    >
      <Icon id="User" size={24} strokeWidth={0.4} />
    </a>
  );
};

export default User;
