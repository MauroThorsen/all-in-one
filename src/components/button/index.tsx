import React from 'react';

interface ButtonProps {
    onClick: () => void;
    text: string;
    children?: React.ReactNode; // 添加一个新的可选属性
}

const Button: React.FC<ButtonProps> & { Items: React.FC<{children?: React.ReactNode}> } = ({ onClick, text, children }) => {
    return (
        <button className='base-button' onClick={onClick}>
            {text}
            {children} {/* 在这里使用children属性 */}
        </button>
    );
};

Button.Items = function Items({ children }) {
    return <div>{children}</div>;
};

export default Button;