import Icon, {
  AvailableIcons,
} from "deco-sites/persono/components/ui/Icon.tsx";

interface Props {
  layout: {
    icon: { src: AvailableIcons; alt: string };
    title: string;
    description: string;
  }[];
}

export default function Benefits({ layout }: Props) {
  return (
    <div>
      <h4 class="text-base">Benefícios para o sono</h4>
      <span class="flex flex-col gap-8 mt-8">
        {layout.map((l) => (
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <Icon
                id={l.icon.src}
                class="text-primary"
                width={36}
                height={36}
                strokeWidth={0.01}
                fill="currentColor"
                alt={l.icon.alt}
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
