import './Button.css';

const Button = ({ text, onClick, type = 'button', className = '' }) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`bg-gradient-to-r from-red-500 to-yellow-600 
                   hover:from-red-400 hover:to-pink-500 
                   text-white font-bold py-1 px-3 rounded 
                   focus:outline-none focus:shadow-outline 
                   transition-all duration-300 ${className}`}
      >
        {text}
      </button>
    </>
  );
};
export default Button;
