import { BsTelephoneFill, BsWhatsapp } from 'react-icons/bs';

export default function MarketingInfo() {
    return (
        <div className='p-4 bg-white border border-borderPrimary rounded-xl'>
            <header className='gap-5 pt-2 flexCenter'>
                <div className='bg-gray-300 rounded-full w-14 h-14'></div>

                <div className='space-y-1'>
                    <p className='text-lg font-bold md:text-xl'>
                        Veronica Chow
                    </p>

                    <p className='text-sm text-secondary'>
                        #1 • Diposting 12 Agustus 2023
                    </p>
                </div>
            </header>

            <main className='gap-4 pt-6 pb-2 mt-6 border-t md:gap-5 border-borderPrimary flexCenter'>
                <button className='gap-2 px-6 py-2 w-fit sm:w-full btnSecondary flexCenter'>
                    <BsTelephoneFill size={20} color='#213D77' />
                    <span className='text-sm text-primary sm:text-base'>
                        Telepon
                    </span>
                </button>

                <button className='gap-2 px-6 py-2 w-fit sm:w-full btnSecondary flexCenter'>
                    <BsWhatsapp size={20} color='#213D77' />
                    <span className='text-sm text-primary sm:text-base'>
                        Whatsapp
                    </span>
                </button>
            </main>
        </div>
    );
}
