const Tag = ({children}) => {
  return (
    <div
      className={`w-max cursor-pointer rounded-md border border-border-100 bg-lightColor-750 px-4 py-2 text-xs text-darkColor-400 shadow-sm dark:border-darkColor-400 dark:bg-shadow-200 dark:text-lite-700`}
    >
      {children}
    </div>
  );
};

export default Tag;
