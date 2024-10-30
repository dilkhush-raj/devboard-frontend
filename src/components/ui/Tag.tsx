const Tag = ({children}) => {
  return (
    <div
      className={`w-max cursor-pointer rounded-md border border-border-100 bg-lightColor-850 px-4 py-2 text-xs shadow-sm hover:text-primary-400 dark:border-dark-600 dark:bg-dark-700`}
    >
      {children}
    </div>
  );
};

export default Tag;
