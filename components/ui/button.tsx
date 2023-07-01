type ButtonProps = React.ComponentPropsWithoutRef<"button">;
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={`md:w-fit bg-blue-900 hover:bg-blue-800 md:active:bg-blue-700 px-6 py-2 rounded text-white ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
