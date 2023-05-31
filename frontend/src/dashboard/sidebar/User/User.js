import React, { useState } from "react";
import UserTable from "../User/UserTable";
import AddEditWrapper from "../../Common/AddEditWrapper";
import TableWrapper from "../../Common/TableWrapper";

const User = () => {
  return (
    <>
      <TableWrapper
        title='Total Customers'
        addlink='/dashboard/users/add'
        link='Add Customer'
      >
        <UserTable />
      </TableWrapper>
    </>
  );
};

export default User;
