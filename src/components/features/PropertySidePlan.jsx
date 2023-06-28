import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function PropertySidePlan({ data }) {
	return (
		<CollapseWrapper title={'Side Plan'} defaultCollapse={false}>
			<div className="w-full bg-gray-100 rounded-2xl">
				<img
					src={data?.detail?.side_plan_image}
					alt="side plan"
					className="w-full h-full rounded-2xl"
				/>
			</div>
		</CollapseWrapper>
	);
}
