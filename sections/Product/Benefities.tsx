import Image from "apps/website/components/Image.tsx";

interface Props {
  layout: {
    icon: { src: string; alt: string };
    title: string;
    description: string;
  }[];
}

export default function Benefities({ layout }: Props) {
  console.log(layout);
  return (
    <div class="border-b-2 py-6">
      <h4 class="text-base">Benefícios para o sono</h4>
      <span class="flex flex-col gap-8 mt-8">
        {layout.map((l) => (
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <Image
                width={100}
                loading="lazy"
                src={l.icon.src}
                alt={l.icon.alt}
                class="w-7 h-7"
              />
              <p class="text-md font-bold">{l.title}</p>
            </div>
            <p class="text-base">{l.description}</p>
          </div>
        ))}
      </span>
    </div>
  );
}
