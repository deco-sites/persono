import Searchbar, {
  EditableProps as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  return (
    <div
      class={`${
        !displaySearchPopup.value ? "-translate-y-full" : "translate-x-[1px]"
      } absolute w-full bg-base-100 left-0 top-full transition-transform duration-300 -z-10 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.14)]`}
    >
      <Searchbar {...searchbar} />
    </div>
  );
}

export default SearchbarModal;
