function PageHeader({ title, subtitle }) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                {title}
            </h1>

            <p className="mt-2 text-sm text-slate-400 md:text-base">
                {subtitle}
            </p>
        </div>
    );
}

export default PageHeader;