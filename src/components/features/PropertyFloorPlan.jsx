import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function PropertyFloorPlan({ data }) {
	return (
		<CollapseWrapper title={'Floorplan / Denah'} defaultCollapse={false}>
			<div className="w-full h-[600px] bg-gray-100 rounded-2xl">
				<img
					src={data?.detail?.floor_plan_image}
					alt="Floorplan"
					className="object-cover w-full h-full rounded-2xl"
				/>
			</div>
		</CollapseWrapper>
	);
}
