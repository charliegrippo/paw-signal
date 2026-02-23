// PawIcon — reusable paw logo image component
// Renders the actual paw-logo.jpg from public/assets, inverted to white for dark backgrounds

interface PawIconProps {
  size?: number
  className?: string
}

export default function PawIcon({ size = 48, className = '' }: PawIconProps) {
  return (
    <img
      src={import.meta.env.BASE_URL + 'assets/paw-logo.jpg'}
      alt="CanWeSayHello"
      width={size}
      height={size}
      className={className}
      style={{
        filter: 'invert(1)',
        mixBlendMode: 'screen',
        objectFit: 'contain',
      }}
    />
  )
}
