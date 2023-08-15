import React from 'react'
import TableWrapper from '../../common/TableWrapper'
import SupplierTable from './SupplierTable'

const Supplier = () => {
    return (
        <TableWrapper
            title='Total Suppliers'
            addlink='/dashboard/suppliers/add'
            link='Add Supplier'
        >
            <SupplierTable />
        </TableWrapper>

    )
}

export default Supplier