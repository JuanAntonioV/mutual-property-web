export default function PageTitle({
    title = 'Judul',
    description = 'Description',
    className = '',
}) {
    return (
        <div className={`space-y-2 py-10 ${className}`}>
            <h1 className='text-2xl font-bold '>{title}</h1>
            <p className='text-sm text-secondary md:text-base'>{description}</p>
        </div>
    );
}
