import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function PropertyPriceList() {
    return (
        <CollapseWrapper title={'Price List'} defaultCollapse={false}>
            <div className='w-full h-[600px] bg-gray-100 rounded-2xl'></div>
        </CollapseWrapper>
    );
}
