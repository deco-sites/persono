interface Props {
  contentLink: string;
}

const IframeComponent = ({ contentLink }: Props) => {
  return (
    <>
      <iframe
        src={contentLink}
        frameBorder="0"
        referrerpolicy="strict-origin"
        sandbox="allow-top-navigation"
        seamless
        class="container h-full py-10"
      />
    </>
  );
};

export default IframeComponent;
