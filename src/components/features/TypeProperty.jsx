import PropertyTypeCard from '../cards/PropertyTypeCard';

export default function TypeProperty() {
    return (
        <div className='p-4'>
            <header>
                <h3 className='text-lg font-semibold'>Tipe Unit (20)</h3>
            </header>

            <main className='mt-6 space-y-6'>
                <PropertyTypeCard />
                <PropertyTypeCard />
                <PropertyTypeCard />
            </main>
        </div>
    );
}
