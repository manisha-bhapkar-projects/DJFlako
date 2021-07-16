import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import CardListTable from "../../components/CardListTable/CardListTable";
import RequestList from "../../components/DummyTable/DummyTable";
import constants from "../../utils/constants";
import { useHistory } from 'react-router-dom';

const RequestDjFlako = props => {
  const [count, setCount] = useState(2);
  const [limit, setlimit] = useState(3);

  useEffect(() => {

  }, []);

  const history = useHistory();
  const handlePageChange = (e) => {

  };
  const Usercolumns = [
    {
      name: "NO.",
      selector: "id",
      // sortable: true,
      grow: "0.1",
      cell: (row) => {
        return <div className="custome-row-style">{row.id}</div>;
      },
    },
    {
      name: "FULL NAME",
      selector: "fullname",
      //   sortable: true,
      grow: "3",
    },
    {
      name: "NUMBER",
      selector: "number",
      //   sortable: true,
      grow: "3",
    },
    {
      name: "EMAIL",
      selector: "email",
      //   sortable: true,
      grow: "4",
    },
    {
      name: "DATE",
      selector: "date",
      //   sortable: true,
      grow: "3",
    },
    {
      name: "TIME",
      selector: "time",
      //   sortable: true,
      grow: "2",
    },
    {
      name: "ADDRESS",
      selector: "address",
      //   sortable: true,
      grow: "5",
    },
    {
      name: "STATE",
      selector: "state",
      //   sortable: true,
      grow: "1",
    },



   

  ];
    return (
  <div className="row">
  <div className="col-md-12 grid-margin stretch-card">
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="card-title mb-0">Request DJ Flako</h6>
          </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group d-flex align-items-center  col-sm-4 ">
                <label>Show</label>
                <select
                  name="name"
                  value={limit}
                  className="form-control  mr-3 ml-3 "
                  onChange={(e) => { setlimit(e.target.value) }}>
                  <option value="10" selected>10</option>
                  <option value="30">20</option>
                  <option value="50">50</option>
                  <option value={RequestList.RequestList.length}>All</option>
                 
                </select>
                <span className="form-group d-flex align-items-center">entries</span>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
            </div>
            <div className="table-responsive">
              <CardListTable
                columns={Usercolumns}
                data={RequestList.RequestList}
                pending={false}
                pagination={false}
                custompagination
                paginationServer={false}
                noDataString={"No data found"}
                totalListCount={RequestList.RequestList.length}
                paginationTotalRows={count}
                paginationPerPage={limit}
                onPageChangedCalled={handlePageChange}
                inputClassName="mt-3"
              // sortFunction={customSort}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    );
};

RequestDjFlako.propTypes = {
    
};

export default RequestDjFlako;