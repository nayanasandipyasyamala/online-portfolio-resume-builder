import { User } from 'lucide-react';

interface AvatarDisplayProps {
  avatar?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-14 h-14 text-lg',
  lg: 'w-20 h-20 text-2xl',
  xl: 'w-28 h-28 text-4xl',
};

const AvatarDisplay = ({ avatar, name, size = 'md', className = '' }: AvatarDisplayProps) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-accent/10 flex items-center justify-center ${className}`}>
      <span className="font-serif font-bold text-accent">{name.charAt(0)}</span>
    </div>
  );
};

export default AvatarDisplay;
