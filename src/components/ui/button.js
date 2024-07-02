import {Ripple} from "react-ripple-click";

export const Button = ({children, onClick}) => {
  return (
    <button
      onClick={(e) => {
        onClick && onClick(e);
      }}
      className="relative isolate flex items-center justify-start gap-4 overflow-hidden rounded-md bg-gradient-primary px-4 py-2 text-white"
    >
      {children}
      <Ripple />
    </button>
  );
};
