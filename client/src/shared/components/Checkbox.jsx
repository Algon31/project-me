import { Check } from "lucide-react";

function Checkbox({

    checked,

    onClick,

}){

    return(

        <button

            onClick={onClick}

            className={`

                flex

                h-14

                w-14

                items-center

                justify-center

                rounded-2xl

                border-2

                transition-all

                duration-300

                ${
                    checked

                    ?

                    "border-green-500 bg-green-500 text-white scale-110"

                    :

                    "border-[var(--border)] bg-white hover:border-[var(--pcolor)]"

                }

            `}

        >

            {

                checked &&

                <Check size={26}/>

            }

        </button>

    );

}

export default Checkbox;