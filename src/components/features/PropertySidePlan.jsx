import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function PropertySidePlan() {
    return (
        <CollapseWrapper title={'Side Plan'} defaultCollapse={false}>
            <div className='w-full h-[600px] bg-gray-100 rounded-2xl'></div>
        </CollapseWrapper>
    );
}
