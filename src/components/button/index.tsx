import React from 'react'

interface ButtonProps {
  onClick: () => void
  text: string
  children?: React.ReactNode // 添加一个新的可选属性
}

const Button: React.FC<ButtonProps> & {
  Items: React.FC<{ children?: React.ReactNode }>
} = ({ onClick, text, children }) => {
  return (
    <>
      <div className="text-amber text-2xl">123</div>
      <button className="b-1 border-cyan" onClick={onClick}>
        <div className="i-bi-arrow-left text-red  text-4xl" />
        {text}
        {children} {/* 在这里使用children属性 */}
      </button>
    </>
  )
}

Button.Items = function Items({ children }) {
  return <div>{children}</div>
}

export default Button
