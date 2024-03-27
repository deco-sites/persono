import BackToTop from "$store/components/footer/BackToTop.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Logo from "$store/components/footer/Logo.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import Social, { SocialItem } from "$store/components/footer/Social.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
// import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface PaymentItem {
  label:
    | "American"
    | "Diners"
    | "Elo"
    | "Mastercard"
    | "Pix"
    | "PagaLeve"
    | "Visa";
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    backToTheTop?: boolean;
  };
}

interface NewsletterProps {
  title?: string;
  /** @format html */
  description?: string;
  form?: NewsletterForm;
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: NewsletterProps;
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
  copyright?: string;
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      backToTheTop: false,
    },
  },
  copyright,
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={false}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={false} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;

  return (
    <footer
      class={`w-full flex flex-col md:pt-12 pt-6 ${ColorClasses(layout)}`}
    >
      <div class="lg:container mx-6 lg:mx-auto">
        <div class="flex flex-col md:gap-12 gap-6">
          {layout?.hide?.newsletter ? <></> : (
            <>
              <Newsletter
                content={newsletter}
                layout={{
                  tiled: true,
                }}
              />
              <Divider />
            </>
          )}
          <div class="flex flex-col lg:flex-row lg:gap-20 md:gap-10 gap-4 lg:justify-start">
            {_sectionLinks}
            {_payments}
          </div>
          <Divider />
        </div>
        <div class="flex flex-row justify-between items-center md:py-8 pt-5 pb-4">
          {_logo}
          {_social}
        </div>
        {copyright
          ? (
            <p class="mt-6 mb-8 text-xs lg:text-sm">
              {copyright}
            </p>
          )
          : null}
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export type { SocialItem };

export default Footer;
