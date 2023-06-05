'use client';

import { calculatePMT, formatRupiah, parseRupiah } from '@/utils/helpers';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function SimulationKpr() {
    const [formValue, setFormValue] = useState({
        hargaProperty: '',
        uangMuka: '',
        jangkaCicilan: 10,
        bunga: 5,
    });

    const [calulateClicked, setCalculateClicked] = useState(false);
    const [calulateLoading, setCalculateLoading] = useState(false);

    const [calculateResult, setCalculateResult] = useState({
        totalBunga: 0,
        cicilanNasabah: 0,
    });

    const handleOnChange = (e) => {
        const target = e.target;
        const value = target.value;
        const regex = /^[a-zA-Z0-9.,-]*$/;

        const formated = formatRupiah(value);

        if (value.match(regex)) {
            if (target.name != 'jangkaCicilan' && target.name != 'bunga') {
                setFormValue({
                    ...formValue,
                    [target.name]: formated,
                });
            } else {
                if (value <= 100 && value >= 0) {
                    setFormValue({
                        ...formValue,
                        [target.name]: value,
                    });
                }
            }
        }
    };

    const calculate = (e) => {
        e.preventDefault();

        const valueParsed = {
            hargaProperty: parseRupiah(formValue.hargaProperty),
            uangMuka: parseRupiah(formValue.uangMuka),
            jangkaCicilan: formValue.jangkaCicilan,
            bunga: formValue.bunga,
        };

        const plafondCost = valueParsed.hargaProperty - valueParsed.uangMuka;

        const pmt = calculatePMT(
            valueParsed.bunga,
            valueParsed.jangkaCicilan,
            -plafondCost
        );

        const ipmt = valueParsed.jangkaCicilan * 12 * pmt;
        const totalBunga = ipmt - plafondCost;

        const resultCicilanNasabah =
            (plafondCost + totalBunga) / (valueParsed.jangkaCicilan * 12);

        setCalculateLoading(true);
        setTimeout(() => {
            setCalculateResult({
                totalBunga: totalBunga.toFixed(0),
                cicilanNasabah: resultCicilanNasabah.toFixed(0),
            });

            setCalculateClicked(true);
            setCalculateLoading(false);
        }, 500);
    };

    return (
        <CollapseWrapper title={'Simulasi KPR'}>
            <form className='space-y-8' onSubmit={calculate}>
                <div className='space-y-4'>
                    <label
                        htmlFor='price'
                        className='text-sm font-medium sm:text-base'
                    >
                        Harga Property
                    </label>

                    <div className='relative flex items-center h-fit'>
                        <div className='w-20 h-[50px] flexCenter rounded-l-lg bg-[#f5f5f5] border-l border-y border-borderPrimary text-secondarySoftTrans'>
                            <span className='text-base font-bold md:text-lg'>
                                Rp
                            </span>
                        </div>
                        <input
                            type='text'
                            name='hargaProperty'
                            placeholder='Rp 0'
                            className='font-semibold rounded-l-none text-end pl-14 inputSecondary focus:border-borderPrimary'
                            min={0}
                            value={formValue.hargaProperty}
                            required
                            onChange={handleOnChange}
                        />
                    </div>
                </div>

                <div className='space-y-4'>
                    <label
                        htmlFor='downPayment'
                        className='text-sm font-medium sm:text-base'
                    >
                        Uang Muka
                    </label>

                    <div className='relative flex items-center h-fit'>
                        <div className='w-20 h-[50px] flexCenter rounded-l-lg bg-[#f5f5f5] border-l border-y border-borderPrimary text-secondarySoftTrans'>
                            <span className='text-base font-bold md:text-lg'>
                                Rp
                            </span>
                        </div>
                        <input
                            id='downPayment'
                            type='text'
                            name='uangMuka'
                            placeholder='Rp 0'
                            className='font-semibold rounded-l-none text-end pl-14 inputSecondary focus:border-borderPrimary'
                            min={0}
                            value={formValue.uangMuka}
                            required
                            onChange={handleOnChange}
                        />
                    </div>
                </div>

                <div className='flexBetween'>
                    <label
                        htmlFor='range'
                        className='text-sm font-medium sm:text-base'
                    >
                        Jangka Waktu KPR
                    </label>

                    <div className='relative flex items-center w-32 sm:w-52 h-fit'>
                        <input
                            id='range'
                            type='text'
                            name='jangkaCicilan'
                            placeholder='1'
                            className='font-semibold rounded-r-none text-end inputSecondary focus:border-borderPrimary'
                            min={1}
                            value={formValue.jangkaCicilan}
                            required
                            onChange={handleOnChange}
                        />
                        <div className='w-28 h-[50px] flexCenter rounded-r-lg bg-[#f5f5f5] border-r border-y border-borderPrimary text-secondarySoftTrans'>
                            <span className='text-sm font-bold md:text-lg'>
                                Tahun
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flexBetween'>
                    <label
                        htmlFor='bunga'
                        className='text-sm font-medium sm:text-base'
                    >
                        Bunga/Tahun
                    </label>

                    <div className='relative flex items-center w-32 h-fit sm:w-52'>
                        <input
                            id='bunga'
                            type='text'
                            name='bunga'
                            placeholder='1'
                            className='font-semibold rounded-r-none text-end inputSecondary focus:border-borderPrimary'
                            min={1}
                            value={formValue.bunga}
                            required
                            onChange={handleOnChange}
                        />
                        <div className='w-20 h-[50px] flexCenter rounded-r-lg bg-[#f5f5f5] border-r border-y border-borderPrimary text-secondarySoftTrans'>
                            <span className='text-base font-bold md:text-lg'>
                                %
                            </span>
                        </div>
                    </div>
                </div>

                {calulateClicked && !calulateLoading && (
                    <div className='px-4 pt-6 mt-2 space-y-4 border-t border-borderPrimary'>
                        <div className='flexBetween'>
                            <p className='font-semibold'>
                                Bunga {formValue.jangkaCicilan}%
                            </p>
                            <p className='font-semibold'>
                                {formatRupiah(
                                    calculateResult.totalBunga,
                                    'Rp. '
                                )}{' '}
                                <span className='text-sm font-light text-secondary'>
                                    / Tahun
                                </span>
                            </p>
                        </div>
                        <div className='flexBetween'>
                            <p className='font-semibold'>Cicilan</p>
                            <p className='font-semibold'>
                                {formatRupiah(
                                    calculateResult.cicilanNasabah,
                                    'Rp. '
                                )}{' '}
                                <span className='text-sm font-light text-secondary'>
                                    / Bulan
                                </span>
                            </p>
                        </div>
                    </div>
                )}

                <div>
                    <button
                        type='submit'
                        className='mt-2 btnPrimary'
                        disabled={calulateLoading}
                    >
                        {calulateLoading ? (
                            <PulseLoader color='#fff' size={10} />
                        ) : (
                            'Simulasikan'
                        )}
                    </button>
                </div>
            </form>
        </CollapseWrapper>
    );
}
