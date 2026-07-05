function PageHeader({ title, subtitle }) {

    return (

        <div className="mb-10">

            <h1 className="text-5xl font-bold tracking-tight">

                {title}

            </h1>

            <p className="mt-3 text-lg text-[var(--muted)]">

                {subtitle}

            </p>

        </div>

    );

}

export default PageHeader;