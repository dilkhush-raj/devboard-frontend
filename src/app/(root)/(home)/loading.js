export default function Loading(){
    const array = [1,2,3,4,5,6,7,8,9]
    return (
      <main className="p-4 ">
        {array.map((item) => (
          <div key={item} className="flex gap-4 p-4 mb-4 rounded-md h-60 bg-lightColor-700 dark:bg-darkColor-300 ">
            <div className="h-full rounded-md aspect-square bg-lightColor-400 dark:bg-darkColor-400">
            </div>
            <div className="flex flex-col w-full gap-3 p-1">
              {array.map((item) => (
                <div key={item} className="w-full h-4 rounded-md flex-0 bg-lightColor-400 dark:bg-darkColor-400"></div>
              ))}
            </div>
          </div>
        ))}
      </main>
    );
  }