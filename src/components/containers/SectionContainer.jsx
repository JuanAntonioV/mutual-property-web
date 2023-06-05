export default function SectionContainer({
    children,
    className = '',
    ...props
}) {
    return (
        <section className={`my-10 ${className}`} {...props}>
            {children}
        </section>
    );
}
