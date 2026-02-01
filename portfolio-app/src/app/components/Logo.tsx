export default function OneSpaceLogo({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', ...style }}>
            {/* Rocket and Orbit Icon */}
            <svg width="40" height="40" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer orbit ring */}
                <ellipse cx="140" cy="140" rx="120" ry="120" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.3" />

                {/* Inner orbit ring */}
                <ellipse cx="140" cy="140" rx="90" ry="90" stroke="currentColor" strokeWidth="6" fill="none" opacity="0.5" />

                {/* Rocket */}
                <g transform="translate(120, 100)">
                    {/* Rocket body */}
                    <path d="M20 0 L30 40 L25 45 L15 45 L10 40 Z" fill="currentColor" />
                    {/* Rocket window */}
                    <circle cx="20" cy="15" r="5" fill="white" opacity="0.3" />
                    {/* Rocket flames */}
                    <path d="M15 45 L12 55 L20 50 L28 55 L25 45" fill="currentColor" opacity="0.6" />
                </g>

                {/* Small orbit dots */}
                <circle cx="140" cy="20" r="4" fill="currentColor" opacity="0.4" />
                <circle cx="260" cy="140" r="4" fill="currentColor" opacity="0.4" />
                <circle cx="20" cy="140" r="4" fill="currentColor" opacity="0.4" />
            </svg>

            {/* OneSpace Text */}
            <span style={{
                fontSize: 'inherit',
                fontWeight: 700,
                letterSpacing: '-0.02em',
            }}>
                OneSpace
            </span>
        </div>
    );
}
