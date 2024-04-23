import Button from "$store/components/ui/Button.tsx";
import Icon from "deco-sites/persono/components/ui/Icon.tsx";

export interface Props {
  /**
   * @description Content will be rendered as markdown.
   * @format rich-text
   */
  /** @format html */
  content?: string;
  serviceInfo?: {
    title: string;
    /**
     * @description Email for company contact
     */
    email: string;
    /**
     * @description Phone number for company contact
     */
    phone: string;
    /**
     * @description Schedule for company contact
     */
    schedule: string[];
  };
}

const defaultServiceInfo = {
  title: "Atendimento",
  email: "contato@agencian1.com.br",
  phone: "11 99999-9999",
  schedule: [
    "Seg. à Sex. das 09:00h às 18:00h",
    "Sábado das 10:00h às 14:00h",
  ],
};

function ContactForm({
  serviceInfo = defaultServiceInfo,
  content,
}: Props) {
  return (
    <div class="pb-12 lg:pb-20">
      <div class="flex flex-col">
        {content && (
          <div
            dangerouslySetInnerHTML={{
              __html: content.replace(/<p>|<\/p>/g, "\n"),
            }}
          />
        )}

        <div class="lg:flex lg:gap-[10px]">
          <div class="lg:w-full">
            {/* Contact info */}
            <div class="flex flex-col gap-5 py-5 border-b border-neutral-200">
              <h6 class="font-semibold">{serviceInfo.title}</h6>
              <div class="flex flex-col gap-[10px] text-sm font-bold text-emphasis">
                <div class="flex">
                  <Icon id="Phone" class="w-5 h-5 mr-[10px]" />
                  <span>{serviceInfo.phone}</span>
                </div>
                <div class="flex">
                  <Icon id="Phone" class="w-5 h-5 mr-[10px]" />
                  <span>{serviceInfo.email}</span>
                </div>
                <div class="text-black font-normal">
                  {serviceInfo.schedule.map((schedule) => <p>{schedule}</p>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div class="mt-[30px] flex flex-col gap-5">
          <h6 class="font-medium text-black text-sm lg:text-base">
            Preencha o formulário abaixo e entre em contato conosco. Em breve
            iremos respondê-lo (a).
          </h6>
          <form class="text-sm flex flex-col gap-5">
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="flex gap-5">
                <div class="form-control gap-[10px] w-full">
                  <label class="font-medium text-base-400" htmlFor="nome">
                    Nome
                  </label>
                  <input
                    placeholder="Digite aqui"
                    name="nome"
                    type="text"
                    class="input input-bordered input-xs h-[34px] border-2 border-base-200"
                  />
                </div>
                <div class="form-control gap-[10px] w-full">
                  <label class="font-medium text-base-400" htmlFor="nome">
                    Sobrenome
                  </label>
                  <input
                    placeholder="Digite aqui"
                    name="nome"
                    type="text"
                    class="input input-bordered input-xs h-[34px] border-2 border-base-200"
                  />
                </div>
              </div>
              <div class="form-control gap-[10px] w-full">
                <label class="font-medium text-base-400" htmlFor="email">
                  E-mail
                </label>
                <input
                  placeholder="Digite aqui"
                  name="email"
                  type="email"
                  class="input input-bordered input-xs h-[34px] border-2 border-base-200"
                />
              </div>
            </div>
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label class="font-medium text-base-400" htmlFor="ddd">
                  Telefone
                </label>
                <div class="flex gap-[10px]">
                  <input
                    placeholder="DDD"
                    name="ddd"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-16 border-2 border-base-200"
                  />
                  <input
                    placeholder="00000-000"
                    name="phonenumber"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-full border-2 border-base-200"
                  />
                </div>
              </div>
              <div class="form-control gap-[10px] w-full">
                <label class="font-medium text-base-400" htmlFor="subject">
                  Solicitação
                </label>
                <div class="flex gap-[10px]">
                  <select
                    name="subject"
                    class="select select-bordered select-xs h-[34px] w-1/2 border-2 border-base-200 font-normal"
                  >
                    <option disabled selected>Selecione</option>
                    <option value="1">Elogio</option>
                    <option value="1">Sugestão</option>
                    <option value="1">Reclamação</option>
                    <option value="1">Dúvida</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-control gap-[10px]">
              <label class="font-medium text-base-400" htmlFor="description">
                Mensagem
              </label>
              <textarea
                placeholder="Digite aqui"
                name="description"
                type="text"
                class="textarea h-28 textarea-bordered resize-none rounded-box w-full border-2 border-base-200"
              />
            </div>
            <div>
              <Button class="btn btn-sm btn-primary hover:text-base-100 w-24 h-[34px]">
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
