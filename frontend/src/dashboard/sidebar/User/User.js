import React, { useState } from "react";
import UserTable from "../User/UserTable";
import AddEditWrapper from "../../common/AddEditWrapper";
import TableWrapper from "../../common/TableWrapper";

const User = () => {
  return (
    <>
      <TableWrapper
        title='Total Customers'
        addlink='/dashboard/customers/add'
        link='Add Customer'
      >
        <UserTable />
      </TableWrapper>
    </>
  );
};

export default User;
