import clsx from "clsx";

const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 flex items-center justify-center w-fit cursor-pointer overflow-hidden rounded-full bg-violet-100 px-4 py-2 text-black transition-colors duration-300 hover:bg-violet-200 sm:px-6 sm:py-3",
        containerClass
      )}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-sans text-xs uppercase tracking-wide sm:text-sm">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;