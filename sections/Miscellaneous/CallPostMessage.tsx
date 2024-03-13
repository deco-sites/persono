import Button from "deco-sites/persono/components/ui/Button.tsx";
import { useId } from "$store/sdk/useId.ts";

const snippet = (id: string) => {
  addEventListener(
    "message",
    (e: MessageEvent<{ type: string; message: string }>) => {
      console.log(e.data.message);
    },
  );

  const button = document.getElementById(id)
  button!.onclick = () => window.parent.postMessage({message: "Deu certo!"})
  ;
};

function CallPostMessage() {
  const id = useId();

  return (
    <>
      <Button id={id}>
        Teste
      </Button>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `(${snippet})("${id}")`,
        }}
      />
    </>
  );
}

export default CallPostMessage;
