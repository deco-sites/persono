import { useEffect } from "preact/compat";
import { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";

export interface Props {
  children?: ComponentChildren;
  activate?: boolean;
}

export const PageFolder = ({ children, activate }: Props) => {
  const showingContent = useSignal(false);
  const showingContentValue = showingContent.value;

  const handleScroll = () => {
    if (window.scrollY > 0) {
      showingContent.value = true;
    }
  };

  useEffect(() => {
    if (!activate) {
      return;
    }

    if (showingContentValue) {
      removeEventListener("scroll", handleScroll);
    } else {
      addEventListener("scroll", handleScroll);
    }

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, [showingContentValue, activate]);

  if (!showingContentValue && activate) {
    return null;
  }

  return <>{children}</>;
};
