interface IProps {
  buttonText: string;
  buttonType: "primary" | "secondary" | "warning" | "danger";
  buttonSize: "small" | "mid" | "large" | "full";
  buttonMargin: true | false;
  clickHandle: () => void;
}

const getButtonSize = (size: string = "mid"): string => {
  switch (size) {
    case "small":
      return "w-10";
    case "mid":
      return "w-25";
    case "large":
      return "w-50";
    case "full":
      return "w-full";
    default:
      return "w-25";
  }
};

function Button(props: IProps) {
  const { buttonText, buttonType, buttonSize, buttonMargin, clickHandle } =
    props;
  return (
    <button
      type="button"
      className={
        (buttonMargin ? "m-2 " : "") +
        getButtonSize(buttonSize) +
        " btn btn-" +
        buttonType
      }
      onClick={() => {
        clickHandle();
      }}
    >
      {buttonText}
    </button>
  );
}

export default Button;
