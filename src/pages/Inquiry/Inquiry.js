import React, { useState } from 'react';
import CardListTable from "../../components/CardListTable/CardListTable";
import InquiryList from "../../components/DummyTable/DummyTable";
const Inquiry = () => {
  const [count, setCount] = useState(2);
  const [limit, setlimit] = useState(5);

  const handlePageChange = (e) => {
  };
  const InquiryColumn = [
    {
      name: "No.",
      selector: "id",
      // sortable: true,
      grow: "1",
      cell: (row) => {
        return <div className="custome-row-style">{row.id}</div>;
      },
    },
    {
      name: "NAME",
      selector: "name",
      //   sortable: true,
      grow: "1",
    },
    {
      name: "MOBILE",
      selector: "mobile",
      //   sortable: true,
      grow: "2",
    },

    {
      name: "EMAIL",
      selector: "email",
      //   sortable: true,
      grow: "2",
    },

    {
      name: "COMMENTS",
      selector: "comments",
      //   sortable: true,
      left: true,
      grow: "4",
    },



  ];
  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Inquery List</h6>
            </div>
            <div className="table-responsive">
              <CardListTable
                columns={InquiryColumn}
                data={InquiryList.InquiryList}
                pending={false}
                pagination={false}
                custompagination
                paginationServer={false}
                noDataString={"No data found"}
                totalListCount={InquiryList.InquiryList.length}
                paginationTotalRows={count}
                paginationPerPage={limit}
                onPageChangedCalled={handlePageChange}
                inputClassName="mt-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Inquiry;