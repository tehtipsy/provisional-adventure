type InputProps = React.ComponentPropsWithoutRef<"input">;
const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      type="text"
      {...props}
      className={`p-2 rounded border border-black dark:border-gray-700 bg-inherit ${props.className}`}
    >
      {props.children}
    </input>
  );
};

export default Input;
