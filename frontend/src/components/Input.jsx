const Input = ({
	type = 'text',
	value = '',
	onChange,
	placeholder = '',
	userClassName = '',
	...props
}) => {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`py-2 px-4 border border-gray-300 ${userClassName}`}
			{...props}
		/>
	);
};

export default Input;
