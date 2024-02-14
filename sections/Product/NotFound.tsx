import Image from "apps/website/components/Image.tsx";

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Image
          width={100}
          class="w-12 h-12"
          src="/zoom-exclamation.svg"
          alt="Icon not Found"
          preload={true}
          loading="eager"
        />
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a
          href="/"
          class="btn btn-primary text-md py-2 px-4 btn-circle no-animation"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}

export default NotFound;
