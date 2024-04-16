import React from 'react'

interface IconProps {
  text: string
  className?: string
}

const Icons: React.FC<IconProps> = ({ text, className }) => {
  const cssCode = `
  .icon-path {
  --icon-url: url("${text}");
  -webkit-mask: var(--icon-url) no-repeat;
  mask: var(--icon-url) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  display: inline-block;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
  vertical-align: middle; // 添加这一行
}
  `
  return (
    <>
      <style>{cssCode}</style>
      <div className={`icon-path ${className}`} />
    </>
  )
}

export function encodeSVG(svg: string) {
  const _svg = svg
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ')
    .replace(/[\n\r]/g, '')
  return `data:image/svg+xml;utf8,${_svg}`
}
export default Icons
