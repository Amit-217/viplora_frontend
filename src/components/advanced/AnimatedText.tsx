import { component$ } from '@builder.io/qwik';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default component$<AnimatedTextProps>(({ text, className = '', delay = 0 }) => {
  return (
    <div class={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, idx) => (
        <span
          key={idx}
          style={{
            display: 'inline-block',
            animation: `slideUp 0.6s ease-out ${delay + idx * 0.05}s forwards`,
            opacity: '0',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
});