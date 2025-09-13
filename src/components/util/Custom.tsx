export const Button = ({
  text,
  onClick,
  className = "bg-black text-white px-5 py-1.5 font-bold",
  type = "button",
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};
