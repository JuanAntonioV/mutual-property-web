import React from 'react';

export default function HomePageStat({ value, detail }) {
    return (
        <div className='flex items-center gap-6'>
            <span className='h-14 md:h-16 w-[3px] rounded-full bg-primary/50'></span>

            <div className='md:space-y-1'>
                <span className='text-2xl font-bold xl:text-3xl text-primary'>
                    {value ?? '20K+'}+
                </span>
                <p className='text-sm font-medium text-secondary md:text-base'>
                    {detail ?? 'Detail'}
                </p>
            </div>
        </div>
    );
}
