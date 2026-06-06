'use client';

const Card = ({
  children,
  icon,
  title,
  subtitle,
  className = '',
  isGlass = false,
  ...props
}) => {
  const cardClass = `${isGlass ? 'glass-card' : 'card'} card-hover ${className}`;

  return (
    <div className={cardClass} {...props}>
      {icon && (
        <div className={`${isGlass ? 'text-slate-800' : 'text-[#4caf50]'} text-4xl mb-4`}>
          {icon}
        </div>
      )}
      {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
      {subtitle && (
        <p className={`${isGlass ? 'text-slate-700' : 'text-gray-600'} mb-4`}>{subtitle}</p>
      )}
      {children}
    </div>
  );
};

export default Card;
