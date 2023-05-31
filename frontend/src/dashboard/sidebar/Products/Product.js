import React, { useState } from "react";
import TableWrapper from "../../Common/TableWrapper";
import ProductTable from "./ProductTable";

const Product = () => {
  return (
    <TableWrapper
      title='Total Products'
      addlink='/dashboard/products/add'
      link='Add Product'
    >
      <ProductTable />
    </TableWrapper>
  );
};

export default Product;
