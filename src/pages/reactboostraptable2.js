import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import mocdata from "../component/MOCK_DATA.json";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Modal, Button } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter,numberFilter , Comparator ,selectFilter  } from 'react-bootstrap-table2-filter';


function Reactboostraptable2() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const selectRow={
    mode: 'checkbox',
    // clickToSelect: true,
    bgColor: '#c8e6c9',
    // selected: [1, 3],
    clicktoEdit: true,
    // onSelect: onRowSelect,
    // onSelectAll: onSelectAll
  }

const selectOptions = {
  0: "Male",
  1: "Female",
  2: 'unknown'
};
const qualityFilter = selectFilter({
  options: selectOptions,
  placeholder: 'My Custom PlaceHolder',  // custom the input placeholder
  className: 'my-custom-text-filter', // custom classname on input
  defaultValue: '2', // default filtering value
  comparator: Comparator.LIKE, // default is Comparator.EQ
  // style: { ... }, // your custom styles on input
  withoutEmptyOption: true  // hide the default select option
  // id: 'id', // assign a unique value for htmlFor attribute, it's useful when you have same dataField across multiple table in one page
});

  const priceFilter = textFilter({
    placeholder: 'My Custom PlaceHolder',  // custom the input placeholder
    className: 'my-custom-text-filter', // custom classname on input
    defaultValue: 'test', // default filtering value
    comparator: Comparator.EQ, // default is Comparator.LIKE
    caseSensitive: true, // default is false, and true will only work when comparator is LIKE
    // style: { ... }, // your custom styles on input
    delay: 1000, // how long will trigger filtering after user typing, default is 500 ms
    id: 'id', // assign a unique value for htmlFor attribute, it's useful when you have same dataField across multiple table in one page
  });

  const columns = [
    {
      dataField: "first_name",
      text: "first Name",
    },
    {
      dataField: "last_name",
      text: "Last Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      filter: textFilter(),
      dataField: "gender",
      text: "Gender",
      editable: false,
      // filter: selectFilter({
      //   options: selectOptions
      // })
     
    },
    {
      dataField: "age",
      text: "Age",
      // filter: textFilter(),
      filter: numberFilter(),
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Please enter numeric value",
          };
        }
        return true;
      },
   
    },
    {
      filter: textFilter(),
      dataField: "country",
      text: "Country",
     
    },
  ];
  // rowevents function create

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log("clicked row", row, rowIndex);
    },
  };
  // rowstyle function create
  const rowStyle = (row, rowIndex) => {
    return {
      backgroundColor: rowIndex % 2 === 0 ? "#FFFFFF" : "#F8F8F8",
      
    };
  };
  // rowclass function create
  const rowClasses = (row, rowIndex) => {
    return rowIndex % 2 === 0 ? "p-0" : "p-0";
  };
  // rowstyle function create
  // const rowEvents = (row, rowIndex) => {
  //     return {
  //         onClick: (e, handleOriginal) => {
  //             console.log('clicked');
  //             console.log(row);
  //             console.log(rowIndex);
  //             if (handleOriginal) {
  //                 handleOriginal();
  //             }
  //         },
  //         onDoubleClick: (e, handleOriginal) => {
  //             console.log('double clicked');
  //             console.log(row);
  //             console.log(rowIndex);
  //             if (handleOriginal) {
  //                 handleOriginal();
  //             }
  //         },
  //         onContextMenu: (e, handleOriginal) => {
  //             console.log('right clicked');
  //             console.log(row);

  //             console.log(rowIndex);
  //             if (handleOriginal) {
  //                 handleOriginal();
  //             }
  //         },
  //         onMouseEnter: (e, handleOriginal) => {
  //             console.log('mouse enter');
  //             console.log(row);
  //             console.log(rowIndex);
  //             if (handleOriginal) {
  //                 handleOriginal();
  //             }
  //         },
  //         onMouseLeave: (e, handleOriginal) => {
  //             console.log('mouse leave');
  //             console.log(row);
  //             console.log(rowIndex);
  //             if (handleOriginal) {
  //                 handleOriginal();
  //             }
  //         }
  //     };
  // };

  return (
    <div className="container-fluid">
      <h2 className="text-center grid justify-center align-content-center space-y-6 space-between">
        React bootstrap table next
      </h2>
      <BootstrapTable
        rowevents={rowEvents}
        keyField="id"
        data={mocdata}
        columns={columns}
        pagination={paginationFactory()}
        rowStyle={rowStyle}
        rowClasses={rowClasses}
        selectRow={selectRow}
        filter={ filterFactory() }
        cellEdit={cellEditFactory({
          mode: 'dbclick',
          blurToSave: true,
          nonEditableRows: () => {
            return [0, 1, 2,
          ];
          },
          editCellStyle: {
            backgroundColor: '#f8f8f8',
            padding: '0px',
            border: 'none',
            outline: 'none',
            width: '100%',
            height: '100%',
            fontSize: '14px',
            fontWeight: 'normal',
            color: '#000',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            boxSizing: 'border-box',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: '1.5',
            borderRadius: '0px',
            boxShadow: 'none',
            backgroundClip: 'padding-box',
            resize: 'none',
            outline: 'none',
            overflow: 'hidden',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            cursor: 'inherit',
            textOverflow: 'ellipsis',
            overflowWrap: 'break-word',
            overflowX: 'hidden',
            overflowY: 'hidden',
            touchAction: 'auto',
            webkitUserSelect: 'text',
            MozUserSelect: 'text',
            msUserSelect: 'text',
            userSelect: 'text',
          },
          blurToSaveCellStyle: {
            backgroundColor: '#f8f8f8',
            padding: '0px',
            border: 'none',
            outline: 'none',
            width: '100%',
            height: '100%',
            fontSize: '14px',
            fontWeight: 'normal',
            color: '#000',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            boxSizing: 'border-box',
            textAlign: 'left',
            verticalAlign: 'middle',
            lineHeight: '1.5',
          }
        })}
        hover
        striped
        condensed
      />
      {/* <BootstrapTable keyField='id' data={ products } columns={ columns } pagination={ paginationFactory() } /> */}
    </div>
  );
}

export default Reactboostraptable2;
