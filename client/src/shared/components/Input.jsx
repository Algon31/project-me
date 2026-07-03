function Input(props) {
    return (
        <input
            {...props}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-blue-500"
        />
    );
}

export default Input;