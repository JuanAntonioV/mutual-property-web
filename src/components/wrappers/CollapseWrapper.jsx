'use client';

import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export default function CollapseWrapper({
    children,
    title,
    defaultCollapse = true,
}) {
    const [collapse, setCollapse] = useState(defaultCollapse);

    return (
        <div className='bg-white border border-borderPrimary rounded-xl'>
            <header>
                <button
                    className={`w-full p-6 flexBetween ${
                        collapse ? 'border-b border-borderPrimary' : ''
                    }`}
                    onClick={() => setCollapse(!collapse)}
                >
                    <h3 className='text-lg font-bold md:text-xl'>
                        {title ?? 'Judul'}
                    </h3>
                    {collapse ? (
                        <MdKeyboardArrowUp size={30} />
                    ) : (
                        <MdKeyboardArrowDown size={30} />
                    )}
                </button>
            </header>

            {collapse && <main className='p-6'>{children}</main>}
        </div>
    );
}
