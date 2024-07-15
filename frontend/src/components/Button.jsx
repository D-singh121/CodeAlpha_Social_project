const Button = ({
	children,
	type = 'button',
	bgColor = '#1D9BF0',
	textColor = 'text-white',
	userClassName = '',
	...props //****** ek property default me hai className but agar user kuch properties pass karna chahta hai to usko  hum "...props" variable  me store karenge */

}) => {
	return (
		<button className={`py-2 px-4 rounded-full ${userClassName} ${bgColor} ${textColor} ${type} `} {...props}    >
			{children}
		</button>
	);
};

export default Button;