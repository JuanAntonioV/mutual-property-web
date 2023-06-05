import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function PropertyFloorPlan() {
    return (
        <CollapseWrapper title={'Floorplan / Denah'} defaultCollapse={false}>
            <div className='w-full h-[600px] bg-gray-100 rounded-2xl'></div>
        </CollapseWrapper>
    );
}
