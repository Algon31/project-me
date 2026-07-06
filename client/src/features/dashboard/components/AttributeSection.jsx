import Card from "../../../shared/components/Card";

function AttributeSection({

    title,

    attributes,

}) {

    return (

        <Card
            className="
                rounded-3xl
                p-5
                sm:p-6
                lg:p-8
            "
        >

            <h2
                className="
                    mb-8
                    text-2xl
                    font-black
                    sm:text-3xl
                "
            >

                {title}

            </h2>

            <div className="space-y-6">

                {

                    Object.entries(attributes).map(

                        ([name,value])=>(

                            <div key={name}>

                                <div className="mb-2 flex items-center justify-between">

                                    <span className="font-semibold">

                                        {name}

                                    </span>

                                    <span className="font-bold">

                                        Lv. {value.level}

                                    </span>

                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-[var(--border)]">

                                    <div

                                        className="
                                            h-full
                                            rounded-full
                                            bg-[var(--pcolor)]
                                            transition-all
                                            duration-700
                                        "

                                        style={{

                                            width:`${Math.min(

                                                (value.xp/100)*100,

                                                100

                                            )}%`

                                        }}

                                    />

                                </div>

                            </div>

                        )

                    )

                }

            </div>

        </Card>

    );

}

export default AttributeSection;