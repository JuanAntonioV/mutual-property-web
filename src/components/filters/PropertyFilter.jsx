import { AiOutlineSearch } from 'react-icons/ai';
import MainContainer from '../containers/MainContainer';
import InputSelect from '../inputs/InputSelect';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyFilter({
	category,
	selectedSubCategory,
	setSelectedSubCategory,
	setOrderBy,
	setSearch,
	searchAction,
}) {
	const navigate = useNavigate();
	const [subCategoryOptions, setSubCategoryOptions] = useState([]);
	const [selectedSubCategoryOptions, setSelectedSubCategoryOptions] = useState({
		value: 'semua',
		label: 'Semua',
	});

	const [searchValue, setSearchValue] = useState('');

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

			setSubCategoryOptions([
				{ value: 'semua', label: 'Semua' },
				...subCategoryOptions,
			]);
		}
	}, [category]);

	const handleSubCategoryChange = data => {
		const { value } = data[0];

		const selected = category?.sub_categories?.find(
			item => item.slug === value
		);

		setSelectedSubCategory(selected);

		if (value == 'semua') {
			navigate(`/property?category=${category?.slug}`);
		} else {
			navigate(`/property?category=${category.slug}&type=${selected.slug}`);
		}
	};

	useEffect(() => {
		if (selectedSubCategory) {
			const selectedSubCategoryOptions = {
				value: selectedSubCategory.slug,
				label: selectedSubCategory.name,
			};

			setSelectedSubCategoryOptions(selectedSubCategoryOptions);
		}
	}, [selectedSubCategory]);

	const sortedPrice = [
		{ value: 'semua', label: 'Semua' },
		{ value: 'termurah', label: 'Termurah' },
		{ value: 'termahal', label: 'Termahal' },
	];

	const handleOnChangeSearch = e => {
		const { value } = e.target;
		setSearchValue(value);
	};

	const handleSearchAction = () => {
		setSearch(searchValue);
		searchAction();
	};

	return (
		<MainContainer className="p-8 bg-white border shadow-md rounded-xl border-borderPrimary">
			<div className="grid grid-cols-2 gap-8 md:gap-6 lg:grid-cols-5">
				<div className="col-span-2 space-y-2">
					<label
						htmlFor="search"
						className={'font-medium text-sm md:text-base'}
					>
						Cari property
					</label>
					<input
						type="text"
						id="search"
						value={searchValue}
						onChange={handleOnChangeSearch}
						placeholder="Cari property..."
						className="w-full inputSecondary bg-gray-50"
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="type" className={'font-medium text-sm md:text-base'}>
						Tipe property
					</label>
					<InputSelect
						options={subCategoryOptions}
						onChange={handleSubCategoryChange}
						value={selectedSubCategoryOptions}
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="price" className={'font-medium text-sm md:text-base'}>
						Harga
					</label>
					<InputSelect
						options={sortedPrice}
						onChange={value => setOrderBy(value[0].value)}
						value={sortedPrice[0]}
					/>
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
