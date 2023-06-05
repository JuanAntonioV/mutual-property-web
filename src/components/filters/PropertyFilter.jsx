import { AiOutlineSearch } from 'react-icons/ai';
import MainContainer from '../containers/MainContainer';
import InputSelect from '../inputs/InputSelect';

export default function PropertyFilter() {
    const typeProperty = [
        { value: 'semua', label: 'Semua' },
        { value: 'rumah', label: 'Rumah' },
        { value: 'ruko', label: 'Ruko' },
        { value: 'gudang-pabrik', label: 'Gudang / Pabrik' },
        { value: 'apartemen', label: 'Apartemen' },
        { value: 'komersial', label: 'Komersial' },
    ];

    // const rangePrice = [
    //     { value: 'semua', label: 'Semua' },
    //     { value: '1', label: 'Rp 0 - Rp 50.000.000' },
    //     { value: '2', label: 'Rp 50.000.001 - Rp 100.000.000' },
    //     { value: '3', label: 'Rp 100.000.001 - Rp 200.000.000' },
    //     { value: '4', label: 'Rp 200.000.001 - Rp 500.000.000' },
    //     { value: '5', label: 'Rp 500.000.001 - Rp 1.000.000.000' },
    //     { value: '6', label: 'Rp 1.000.000.001 - Tertinggi' },
    // ];

    const sortedPrice = [
        { value: 'semua', label: 'Semua' },
        { value: 'termurah', label: 'Termurah' },
        { value: 'termahal', label: 'Termahal' },
    ];

    return (
        <MainContainer className='p-8 bg-white border shadow-md rounded-xl border-borderPrimary'>
            <div className='grid grid-cols-2 gap-8 md:gap-6 lg:grid-cols-5'>
                <div className='col-span-2 space-y-2'>
                    <label
                        htmlFor='search'
                        className={'font-medium text-sm md:text-base'}
                    >
                        Cari property
                    </label>
                    <input
                        type='text'
                        id='search'
                        placeholder='Cari property...'
                        className='w-full inputSecondary bg-gray-50'
                    />
                </div>
                <div className='space-y-2'>
                    <label
                        htmlFor='type'
                        className={'font-medium text-sm md:text-base'}
                    >
                        Tipe property
                    </label>
                    <InputSelect
                        options={typeProperty}
                        onChange={(value) =>
                            console.log('tipe property', value)
                        }
                        defaultValue={typeProperty[0]}
                    />
                </div>
                <div className='space-y-2'>
                    <label
                        htmlFor='price'
                        className={'font-medium text-sm md:text-base'}
                    >
                        Harga
                    </label>
                    <InputSelect
                        options={sortedPrice}
                        onChange={(value) => console.log('range harga', value)}
                        defaultValue={sortedPrice[0]}
                    />
                </div>
                <div className='items-end col-span-2 flexCenter lg:col-span-1'>
                    <button className='gap-2 flexCenter btnPrimary h-[50px]'>
                        <AiOutlineSearch size={24} color='white' />
                        Search
                    </button>
                </div>
            </div>
        </MainContainer>
    );
}
