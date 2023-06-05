import MainBadge from '../badges/MainBadge';
import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function PropertyDetail() {
    return (
        <CollapseWrapper title={'Detail Property'}>
            <div className='grid grid-cols-2 gap-8 px-8'>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>Ukuran Tanah</h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>6 x 13 m</p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>Luas Tanah</h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>
                            78 &#13217;
                        </p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>
                            Ukuran Bangunan
                        </h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>6 x 20 m</p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>Luas Bangunan</h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>
                            120 &#13217;
                        </p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>Jumlah Lantai</h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>2.5 Lantai</p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>
                            Jumlah Kamar Tidur
                        </h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>3</p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>
                            Jumlah Kamar Mandi
                        </h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>2</p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>Carport</h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>1</p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>
                            Kondisi Bangunan
                        </h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>Siap huni</p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>
                            Meteran Listrik
                        </h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>2200 watt</p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>Hadap</h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>Barat</p>
                    </main>
                </div>
                <div className='space-y-1'>
                    <header>
                        <h2 className='text-lg font-semibold'>Sertifikat</h2>
                    </header>
                    <main>
                        <p className='font-medium text-secondary'>SHM</p>
                    </main>
                </div>
            </div>

            <div className='px-8 pb-4 mt-10 space-y-2'>
                <header>
                    <h2 className='text-lg font-semibold'>Sudah Termasuk</h2>
                </header>

                <main className='flex flex-wrap items-center gap-4'>
                    <MainBadge value='Meteran PLN' />
                    <MainBadge value='Meteran PDAM' />
                    <MainBadge value='Keramik' />
                    <MainBadge value='Cat Dinding' />
                </main>
            </div>
        </CollapseWrapper>
    );
}
