function Emoji({
  label,
  symbol
} : {
  label: string
  symbol: any
}) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label || ''}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </span>
  )
}

export default Emoji
