import React, { useState } from "react";
import TableWrapper from "../../common/TableWrapper";
import ProductTable from "./ProductTable";

const Product = () => {
  return (
    <TableWrapper title='Total Bikes' addlink='/dashboard/products/add'>
      <ProductTable />
    </TableWrapper>
  );
};

export default Product;
