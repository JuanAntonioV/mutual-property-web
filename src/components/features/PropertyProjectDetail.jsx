import { MdHome, MdNaturePeople } from 'react-icons/md';
import CollapseWrapper from '../wrappers/CollapseWrapper';
import { BsRulers } from 'react-icons/bs';
import { HiDocumentText } from 'react-icons/hi';

export default function PropertyProjectDetail() {
    return (
        <CollapseWrapper title={'Data Proyek'}>
            <div className='grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 lg:px-8'>
                <div className='flex items-center gap-3 space-y-1'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 flexCenter'>
                        <MdHome size={'full'} color='#213D77' />
                    </div>

                    <div>
                        <header>
                            <h2 className='font-semibold lg:text-lg'>
                                Total Unit Proyek
                            </h2>
                        </header>
                        <main>
                            <p className='text-sm font-medium lg:text-base text-secondary'>
                                59 Unit
                            </p>
                        </main>
                    </div>
                </div>
                <div className='flex items-center gap-3 space-y-1'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 flexCenter'>
                        <HiDocumentText size={46} color='#213D77' />
                    </div>

                    <div>
                        <header>
                            <h2 className='font-semibold lg:text-lg'>
                                Status Kepemilikan
                            </h2>
                        </header>
                        <main>
                            <p className='text-sm font-medium lg:text-base text-secondary'>
                                SHM
                            </p>
                        </main>
                    </div>
                </div>
                <div className='flex items-center gap-3 space-y-1'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 flexCenter'>
                        <BsRulers
                            size={38}
                            color='#213D77'
                            className='hidden sm:block'
                        />
                        <BsRulers
                            size={34}
                            color='#213D77'
                            className='block sm:hidden'
                        />
                    </div>

                    <div>
                        <header>
                            <h2 className='font-semibold lg:text-lg'>
                                Luas Area Proyek
                            </h2>
                        </header>
                        <main>
                            <p className='text-sm font-medium lg:text-base text-secondary'>
                                310 m<sup>2</sup>
                            </p>
                        </main>
                    </div>
                </div>
                <div className='flex items-center gap-3 space-y-1'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 flexCenter'>
                        <MdNaturePeople size={'full'} color='#213D77' />
                    </div>

                    <div>
                        <header>
                            <h2 className='font-semibold lg:text-lg'>
                                Fasilitas
                            </h2>
                        </header>
                        <main>
                            <p className='text-sm font-medium lg:text-base text-secondary'>
                                -
                            </p>
                        </main>
                    </div>
                </div>
            </div>

            <div className='px-2 mt-10'>
                <header>
                    <h2 className='font-semibold lg:text-lg'>
                        Informasi Lainnya
                    </h2>
                </header>

                <main className='py-4 space-y-6 text-sm font-medium text-secondary md:text-base'>
                    <div className='space-y-1'>
                        <p>TEMPULING AURORA</p>
                        <p>Jl. Tempuling no. 38 - Inti Kota Medan</p>
                    </div>
                    <div className='space-y-1'>
                        <p>COCOK UNTUK LOKASI USAHA</p>
                        <p>Tuasan - Sutomo Ujung - H.M. Yamin</p>
                    </div>
                    <div className='space-y-1'>
                        <p>Ruko 31/2 Tkt</p>
                        <p>LT. 4 x 18 m | Kosong | 140 m2</p>
                    </div>
                    <div className='space-y-1'>
                        <p>Hadap: Barat</p>
                    </div>
                </main>
            </div>
        </CollapseWrapper>
    );
}
