import Select from 'react-dropdown-select';

export default function InputSelect({
	options,
	value,
	onChange,
	className = '!border-borderPrimary',
}) {
	return (
		<Select
			options={options}
			name="type"
			searchable={false}
			placeholder="Pilih tipe properti..."
			values={value ? [value] : []}
			className={`w-full h-[50px] !rounded-lg !ring-0 !px-4 ${className}`}
			itemRenderer={({ item, methods }) =>
				item.disabled ? (
					<div className="p-3 text-[#555] rounded-md m-1 cursor-pointer hover:bg-[#f2f2f2] ">
						<div aria-disabled className="flex item-center">
							{item.label}
						</div>
					</div>
				) : (
					<div
						className="p-3 text-[#555] rounded-md m-1 cursor-pointer hover:bg-[#f2f2f2]"
						onClick={() => methods.addItem(item)}
					>
						<div className="flex items-center">
							<input
								onChange={() => methods.addItem(item)}
								type="radio"
								checked={methods.isSelected(item)}
								className="mr-[10px] w-5 h-5 rounded-lg appearance-none border border-borderPrimary checked:bg-white checked:border-primary checked:border-8 focus:outline-none"
							/>{' '}
							<span className="font-medium">{item.label}</span>
						</div>
					</div>
				)
			}
			onChange={onChange}
		/>
	);
}
