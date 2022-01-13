import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory , { PaginationProvider, PaginationListStandalone } from "react-bootstrap-table2-paginator";
import mocdata from "../component/MOCK_DATA.json";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Modal, Button } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import filterFactory, {
  textFilter,
  numberFilter,
  Comparator,
  selectFilter,
} from "react-bootstrap-table2-filter";
import "../index.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
// import search from "react-bootstrap-table2-toolkit";
import overlayFactory from "react-bootstrap-table2-overlay";
function Toolkit() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  //   const [columns, setColumns] = useState([]);
  //   const { SearchBar } = Search;
  console.log(data);
  //   create get data function from api
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));
  }, []);

  const selectOptions = {
    0: 'true',
    1: 'false',
    
  };
  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "userId",
      text: "UserId",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "completed",
      text: "Completed",
      sort: true,
      formatter: cell => selectOptions[cell],
      filter:selectFilter({
        options: selectOptions,
      }),
      // filter: textFilter(),
    },
    //   {
    //     dataField: "price",
    //     text: "Price",
    //     sort: true,
    //     filter: numberFilter({
    //       comparator: Comparator.EQ,
    //       numberComparator: Comparator.EQ,
    //       defaultValue: 0,
    //       style: {
    //         width: "100px",
    //       },
    //     }),
    //   },

    {
      dataField: "action",
      text: "Action",
      sort: true,
      formatter: (cell, row) => {
        return (
          <div>
            <Button
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setShow(true);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const selectRow = {
    mode: "checkbox",
    // clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log(row, isSelect, rowIndex, e);
    },
    onSelectAll: (isSelect, rows, e) => {
      console.log(isSelect);
    },
  };

    const overlay = overlayFactory({
        spinner: true,
        styles: {
            overlay: (base) => ({
                ...base,
                background: 'rgba(0, 0, 0, 0.5)'
            }),
            spinner: (base) => ({
                ...base,
                borderTopColor: '#00BFFF',
                borderBottomColor: '#00BFFF',
                borderLeftColor: '#00BFFF',
                borderRightColor: '#00BFFF'
            })
        }
    });

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
          Showing { from } to { to } of { size } Results
        </span>
      );
      
      
      const options = {
        paginationSize: 4,
        pageStartIndex: 0,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'All', value: data.length
        }] // A numeric array is also available. the purpose of above example is custom the text
      };

     
      
   
  return (
    <div>
      <h2 className="text-center grid justify-center text-slate-700 font-serif">
        React bootstrap table next toolkitprovider component
      </h2>
      <div>
        <BootstrapTable
          bootstrap4
          rowStyle={{ backgroundColor: "white" }}
          rowClasses="text-center"
          selectRow={selectRow}
          // rowevents={rowEvents}
          keyField="id"
          data={data}
          columns={columns}
          pagination={paginationFactory(options)}
          filter={filterFactory()}
          cellEdit={cellEditFactory({
            mode: "dbclick",
            blurToSave: true,
            //   nonEditableRows: () => {
            //     return [0, 1, 2,
            //   ];
            //   },
            editCellStyle: {
              backgroundColor: "#f8f8f8",
              padding: "0px",
              border: "none",
              outline: "none",
              width: "100%",
              height: "100%",
              fontSize: "14px",
              fontWeight: "normal",
              color: "#000",
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              boxSizing: "border-box",
              textAlign: "left",
              verticalAlign: "middle",
              lineHeight: "1.5",
              borderRadius: "0px",
              boxShadow: "none",
              backgroundClip: "padding-box",
              resize: "none",
              outline: "none",
              overflow: "hidden",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              cursor: "inherit",
              textOverflow: "ellipsis",
              overflowWrap: "break-word",
              overflowX: "hidden",
              overflowY: "hidden",
              touchAction: "auto",
              webkitUserSelect: "text",
              MozUserSelect: "text",
              msUserSelect: "text",
              userSelect: "text",
            },
            blurToSaveCellStyle: {
              backgroundColor: "#f8f8f8",
              padding: "0px",
              border: "none",
              outline: "none",
              width: "100%",
              height: "100%",
              fontSize: "14px",
              fontWeight: "normal",
              color: "#000",
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              boxSizing: "border-box",
              textAlign: "left",
              verticalAlign: "middle",
              lineHeight: "1.5",
            },
          })}
          hover
          striped
          condensed
          wrapperClasses="table-responsive"
          headerWrapperClasses="thead-dark"
          bodyWrapperClasses="table-responsive"
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Modal body text goes here.</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Toolkit;

// <div>
// <h2>React BootstrapTable Toolkitprovider Component</h2>
// <ToolkitProvider
//   keyField="id"
//   data={data}
//   columns={columns}
//   search
//   overlay={overlayFactory()}
//   pagination={paginationFactory()}
//   filter={filterFactory()}
//   cellEdit={cellEditFactory({
//     mode: "click",
//     blurToSave: true,
//   //   afterSaveCell: onAfterSaveCell,
//   })}
// >
//   {(props) => (
//     <div>
//       <SearchBar {...props.searchProps} />
//       {/* <ExportCSVButton {...props.csvProps} /> */}
//       <BootstrapTable
//         {...props.baseProps}
//         bootstrap4
//         striped
//         hover
//         condensed
//         wrapperClasses="table-responsive"
//         headerWrapperClasses="thead-dark"
//         bodyWrapperClasses="table-responsive"
//       />
//     </div>
//   )}
// </ToolkitProvider>
// <Modal show={show} onHide={handleClose}>
//   <Modal.Header closeButton>
//     <Modal.Title>Modal heading</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={handleClose}>
//       Close
//     </Button>
//     <Button variant="primary" onClick={handleClose}>
//       Save Changes
//     </Button>
//   </Modal.Footer>
// </Modal>
// </div>

// .................................
