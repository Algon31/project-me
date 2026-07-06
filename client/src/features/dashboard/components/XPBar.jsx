function XPBar({

    current,

    required,

}) {

    const percent =

        Math.min(

            (current / required) * 100,

            100

        );

    return (

        <div
            className="
                rounded-3xl
                bg-white
                p-6
                shadow-sm
            "
        >

            <div className="mb-4 flex justify-between">

                <span className="font-semibold">

                    Experience

                </span>

                <span className="font-bold text-[var(--pcolor)]">

                    {current} / {required} XP

                </span>

            </div>

            <div className="h-4 rounded-full bg-[var(--border)] overflow-hidden">

                <div

                    className="
                        h-full
                        rounded-full
                        bg-[var(--pcolor)]
                        transition-all
                        duration-700
                    "

                    style={{

                        width:`${percent}%`

                    }}

                />

            </div>

        </div>

    );

}

export default XPBar;