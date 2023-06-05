export default function MainBadge({ value }) {
    return (
        <div className='px-4 py-1 rounded-lg bg-primary flexCenter'>
            <span className='text-sm font-bold text-white'>
                {value ?? 'Text'}
            </span>
        </div>
    );
}
