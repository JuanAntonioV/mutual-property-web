import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function PropertyPriceList({ data }) {
	return (
		<CollapseWrapper title={'Price List'} defaultCollapse={false}>
			<div className="w-full bg-gray-100 rounded-2xl">
				<img
					src={data?.detail?.price_list_image}
					alt="price list"
					className="w-full rounded-2xl"
				/>
			</div>
		</CollapseWrapper>
	);
}
