import { AiOutlineSearch } from 'react-icons/ai';
import MainContainer from '../containers/MainContainer';
import InputSelect from '../inputs/InputSelect';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatRupiah, parseRupiah } from '@/utils/helpers';

export default function PropertyFilter({
	category,
	selectedSubCategory,
	setSelectedSubCategory,
	setOrderBy,
	setSearch,
	setPrice,
}) {
	const navigate = useNavigate();
	const [subCategoryOptions, setSubCategoryOptions] = useState([]);
	const [selectedSubCategoryOptions, setSelectedSubCategoryOptions] = useState({
		value: 'semua',
		label: 'Semua',
	});
	const [selectedOrderBy, setSelectedOrderBy] = useState('created_at');
	const [selectedSubCategoryValue, setSelectedSubCategoryValue] =
		useState(null);

	const [searchValue, setSearchValue] = useState('');

	const [priceFilter, setPriceFilter] = useState({
		from: '',
		to: '',
	});

	const handlePriceOnChange = e => {
		const { name, value } = e.target;
		const regex = /^[a-zA-Z0-9.,-]*$/;

		const formated = formatRupiah(value);

		if (value === '' || value.match(regex)) {
			setPriceFilter({
				...priceFilter,
				[name]: formated,
			});
		}
	};

	// const rangePrice = [
	//     { value: 'semua', label: 'Semua' },
	//     { value: '1', label: 'Rp 0 - Rp 50.000.000' },
	//     { value: '2', label: 'Rp 50.000.001 - Rp 100.000.000' },
	//     { value: '3', label: 'Rp 100.000.001 - Rp 200.000.000' },
	//     { value: '4', label: 'Rp 200.000.001 - Rp 500.000.000' },
	//     { value: '5', label: 'Rp 500.000.001 - Rp 1.000.000.000' },
	//     { value: '6', label: 'Rp 1.000.000.001 - Tertinggi' },
	// ];

	useEffect(() => {
		if (category) {
			const subCategoryOptions = category?.sub_categories?.map(item => ({
				value: item.slug,
				label: item.name,
			}));

			subCategoryOptions.unshift({
				value: 'semua',
				label: 'Semua',
			});

			setSubCategoryOptions(subCategoryOptions);
		}
	}, [category]);

	useEffect(() => {
		if (selectedSubCategory) {
			const selectedSubCategoryOptions = {
				value: selectedSubCategory?.slug,
				label: selectedSubCategory?.name,
			};

			setSelectedSubCategoryOptions(selectedSubCategoryOptions);
		}
	}, [selectedSubCategory]);

	const handleSubCategoryChange = data => {
		const { value } = data[0];

		const selected = category?.sub_categories?.find(
			item => item.slug === value
		);

		setSelectedSubCategoryValue(selected);
	};

	useEffect(() => {
		if (selectedSubCategoryValue) {
			const selectedSubCategoryOptions = {
				value: selectedSubCategoryValue?.slug,
				label: selectedSubCategoryValue?.name,
			};

			setSelectedSubCategoryOptions(selectedSubCategoryOptions);
		}
	}, [selectedSubCategoryValue]);

	// const sortedPrice = [
	// 	{ value: 'semua', label: 'Semua' },
	// 	{ value: 'termurah', label: 'Termurah' },
	// 	{ value: 'termahal', label: 'Termahal' },
	// ];

	const handleOnChangeSearch = e => {
		const { value } = e.target;
		setSearchValue(value);
	};

	const [searchParams] = useSearchParams();
	const marketingRef = searchParams.get('ref');

	const handleSearchAction = () => {
		setSearch(searchValue);
		setOrderBy(selectedOrderBy);
		setSelectedSubCategory(selectedSubCategoryValue);

		const priceFilterParsed = {
			from: priceFilter.from ? parseRupiah(priceFilter.from) : null,
			to: priceFilter.to ? parseRupiah(priceFilter.to) : null,
		};

		setPrice(priceFilterParsed);

		if (selectedSubCategoryValue?.slug !== undefined) {
			navigate(
				`/property?category=${category?.slug}&type=${
					selectedSubCategoryValue?.slug
				}${marketingRef ? `&ref=${marketingRef}` : ''}`
			);
		} else {
			navigate(
				`/property?category=${category?.slug}${
					marketingRef ? `&ref=${marketingRef}` : ''
				}`
			);
		}
	};

	return (
		<MainContainer className="p-8 transition bg-white border shadow-md rounded-xl border-borderPrimary hover:border-primary">
			<div className="grid grid-cols-2 gap-8 md:gap-6 lg:grid-cols-5">
				<div className="col-span-2 space-y-2 md:col-span-3 lg:col-span-1">
					<label
						htmlFor="search"
						className={'font-medium text-sm md:text-base'}
					>
						Cari properti
					</label>
					<input
						type="text"
						id="search"
						value={searchValue}
						onChange={handleOnChangeSearch}
						placeholder="Cari properti..."
						className="w-full bg-white inputSecondary"
					/>
				</div>
				<div className="col-span-2 space-y-2 md:col-span-3 lg:col-span-1">
					<label htmlFor="type" className={'font-medium text-sm md:text-base'}>
						Tipe properti
					</label>
					<InputSelect
						options={subCategoryOptions}
						onChange={handleSubCategoryChange}
						value={selectedSubCategoryOptions}
					/>
				</div>
				<div className="flex items-center col-span-2 gap-4">
					{/* <div className="space-y-2">
						<InputSelect
						options={sortedPrice}
						onChange={value => setSelectedOrderBy(value[0].value)}
						value={sortedPrice[0]}
					/>
					</div> */}
					<div className="w-full space-y-2">
						<label
							htmlFor="priceFrom"
							className={'font-medium text-sm md:text-base'}
						>
							Mulai dari
						</label>
						<input
							type="text"
							id="priceFrom"
							name="from"
							value={priceFilter.from}
							onChange={handlePriceOnChange}
							placeholder="Rp 0"
							className="w-full bg-white inputSecondary"
						/>
					</div>
					<span className="mx-2 mt-8">-</span>
					<div className="w-full space-y-2">
						<label
							htmlFor="priceTo"
							className={'font-medium text-sm md:text-base'}
						>
							Sampai dengan
						</label>
						<input
							type="text"
							id="priceTo"
							name="to"
							value={priceFilter.to}
							onChange={handlePriceOnChange}
							placeholder="Rp 0"
							className="w-full bg-white inputSecondary"
						/>
					</div>
				</div>
				<div className="items-end col-span-2 flexCenter lg:col-span-1">
					<button
						className="gap-2 flexCenter btnPrimary h-[50px]"
						onClick={handleSearchAction}
					>
						<AiOutlineSearch size={24} color="white" />
						Search
					</button>
				</div>
			</div>
		</MainContainer>
	);
}
