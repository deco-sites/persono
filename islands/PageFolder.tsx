import { useEffect } from "preact/compat";
import { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";

export interface Props {
  children?: ComponentChildren;
  keepVisible?: boolean;
}

export const PageFolder = ({ children, keepVisible }: Props) => {
  const showingContent = useSignal(false);
  const showingContentValue = showingContent.value;

  const handleScroll = () => {
    if (window.scrollY > 0) {
      showingContent.value = true;
    }
  };

  useEffect(() => {
    if (showingContentValue || keepVisible) {
      removeEventListener("scroll", handleScroll);
    } else {
      addEventListener("scroll", handleScroll);
    }

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, [showingContentValue, keepVisible]);

  if (!showingContentValue && !keepVisible) {
    return null;
  }

  return <>{children}</>;
};
