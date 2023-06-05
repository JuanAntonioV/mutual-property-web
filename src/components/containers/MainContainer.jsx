export default function MainContainer({ children, className = '', ...rest }) {
    return (
        <main className={`container max-3xl ${className}`} {...rest}>
            {children}
        </main>
    );
}
