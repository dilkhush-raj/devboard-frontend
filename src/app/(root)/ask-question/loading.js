export default function Loading(){
    return(
        <div>
            {[0,1,2,3,4,5].map((item) => (
                <div key={item} className="h-40 bg-lightColor-800 dark:bg-darkColor-300 ">

                </div>
            ))}
        </div>
    )
}