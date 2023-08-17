import React from 'react'
import TableWrapper from '../../common/TableWrapper'
import OrderTable from './OrderTable'

const Order = () => {
    return (
        <TableWrapper
            title='Total Suppliers'
            addlink='/dashboard/order/add'
            link='Add Order'
        >
            <OrderTable />
        </TableWrapper>

    )
}

export default Order