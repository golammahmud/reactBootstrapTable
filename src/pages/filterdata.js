import BootstrapTable from "react-bootstrap-table-next";
import React, { useState, useEffect } from "react";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Modal, Button } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import filterFactory, {
  numberFilter,
  Comparator,
  selectFilter,
  textFilter,
  dateFilter,
  multiSelectFilter,
} from "react-bootstrap-table2-filter";
import "../index.css";
import mocdata from "../component/MOCK_DATA.json";
import overlayFactory from "react-bootstrap-table2-overlay";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

function Filterdata() {
  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const mocData = mocdata;
  const [show, setShow] = useState(false);

  const [searchinput, setSearchInput] = useState("");
  const [output, setOutput] = useState([]);

  const colum=Object.keys(mocData[0]);
  console.log(colum);

  const search=(rows)=>{
    const columns=rows[0] && Object.keys(rows[0]);
    return rows.filter((row)=>
    columns.some((column)=>row[column].toString().toLowerCase().indexOf(searchinput.toLowerCase())>-1)
    
    );
     
  }

// const search=(rows) => {
//   const searchinput = watch("searchinput");
//   const output = rows.filter((row) => {
//     return row.first_name.toLowerCase().includes(searchinput.toLowerCase());
//   });
//   setOutput(output);
// }

// using Logical OR to search
  // const search = (rows) => {
  //   return rows.filter((row) => {
  //     return (
  //       row.first_name.toLowerCase().includes(searchinput.toLowerCase()) ||
  //       row.last_name.toLowerCase().includes(searchinput.toLowerCase()) ||
  //       row.email.toLowerCase().includes(searchinput.toLowerCase()) ||
  //       row.gender.toLowerCase().includes(searchinput.toLowerCase()) ||
  //       row.country.toLowerCase().includes(searchinput.toLowerCase()) ||
  //       row.date_of_birth.toLowerCase().includes(searchinput.toLowerCase())
  //     );
  //   });
  // };

  // const q=watch("search");
  // console.log(q)
  // console.log(sdata)

  //   const onSubmit = (values) => {
  //     setQ(values)
  //         if (q !== '') {
  //             const filteredData = mocData.filter((item) => {
  //                 return Object.values(item).join('').toLowerCase().includes(q.toLowerCase())
  //             })
  //             setSearchData(filteredData)
  //         }
  //         else{
  //           setSearchData(mocData)
  //         }
  //   };

  // mocData.map((item)=>{
  //   if(!gender.includes(item.gender)){
  //     gender.push(item.gender)
  //   }
  // })

  const data1 = [
    { id: 1, name: "George", animal: "Monkey" },
    { id: 2, name: "Jeffrey", animal: "Giraffe" },
    { id: 3, name: "Alice", animal: "Giraffe" },
    { id: 4, name: "Alice", animal: "Tiger" },
  ];
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));
  }, []);

  // const selectOptions = [
  //   { value: 'Monkey', label: 'Monkey' },
  //   { value: 'Giraffe', label: 'Giraffe' },
  //   { value: 'Tiger', label: 'Tiger' }
  // ];

  const selectOptions = {
    Monkey: "Monkey",
    Giraffe: "Giraffe",
    Tiger: "Tiger",
  };
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      hidden: true,
    },
    {
      dataField: "first_name",
      text: "First Name",
      filter: textFilter(),
      headerStyle: (column, colIndex) => {
        return {
          width: "auto",
          textAlign: "center",
        };
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          width: "auto",
          textAlign: "center",
          height: "auto",

          overflow: "auto",
        };
      },
    },
    {
      dataField: "last_name",
      text: "Last Name",
      filter: textFilter(),
      headerStyle: (column, colIndex) => {
        return {
          width: "auto",
          textAlign: "center",
        };
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          width: "auto",
          textAlign: "center",
          height: "auto",

          overflow: "auto",
        };
      },
    },
    {
      dataField: "email",
      text: "Email",
      filter: textFilter(),
      headerStyle: (column, colIndex) => {
        return {
          width: "auto",
          textAlign: "center",
        };
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          width: "auto",
          textAlign: "center",
          height: "auto",

          overflow: "auto",
        };
      },
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
      filter: textFilter({
        comparator: [Comparator.EQ, Comparator.LIKE],
        caseSensitive: false,
      }),
      headerStyle: (column, colIndex) => {
        return {
          width: "10%",
          textAlign: "center",
        };
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          width: "10%",
          textAlign: "center",
          height: "auto",
          // width: "auto",
          overflow: "auto",
        };
      },
    },
    {
      dataField: "country",
      text: "Country",
      sort: true,
      filter: textFilter({
        // placeholder: 'Search...',
        style: { display: "inline-block", width: "100%" },
        className: "form-control",
        comparator: [Comparator.LIKE, Comparator.EQ],

        // defaultValue: '',
        // delay: 1000,
        caseSensitive: false,
        strict: false,
        ignoreAccents: true,
        // customComparator: (filter, row, column) => {
        //   const id = filter.pivotId || filter.id;
        //   if (id === 'name') {
        //     return row[id].startsWith(filter.value);
        //   }
        //   if (id === 'country') {
        //     return row[id].toLowerCase().startsWith(filter.value.toLowerCase());
        //   }
        // }
      }),

      headerStyle: (column, colIndex) => {
        return {
          width: "10%",
          textAlign: "center",
          overflow: "auto",
        };
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          width: "10%",
          textAlign: "center",
          height: "auto",
          // width: "auto",
          overflow: "auto",
        };
      },
    },
    {
      dataField: "date_of_birth",
      text: "Date_of_birth",
      filter: dateFilter({
        delay: 600, // how long will trigger filtering after user typing, default is 500 ms
        placeholder: "custom placeholder", // placeholder for date input
        withoutEmptyComparatorOption: true, // dont render empty option for comparator
        comparators: [Comparator.EQ, Comparator.GT, Comparator.LT], // Custom the comparators
        style: {
          display: "inline-grid",
          overflow: "auto",
          width: "100%",
          padding: "-10px",
        }, // custom the style on date filter
        className: "custom-dateFilter-class", // custom the class on date filter
        comparatorStyle: { overflow: "auto", width: "100%", padding: "-10px" }, // custom the style on comparator select
        comparatorClassName: "custom-comparator-class", // custom the class on comparator select
        dateStyle: { overflow: "auto", width: "100%", padding: "-10px" }, // custom the style on date input
        dateClassName: "custom-date-class", // custom the class on date input
        // defaultValue: { date: new Date(2018, 0, 1), comparator: Comparator.GT },  // default value
      }),
      headerStyle: (column, colIndex) => {
        return {
          width: "auto",
          textAlign: "center",
          overflow: "auto",
        };
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          width: "auto",
          textAlign: "center",
          height: "auto",

          overflow: "auto",
        };
      },
    },
  ];

  // const columns = [
  //   { dataField: "id",
  //    text: "Id" ,
  //    sort: true,
  //    filter:numberFilter({
  //     // options: [1,2,3],  // if options defined, will render number select instead of number input
  //   delay: 600, // how long will trigger filtering after user typing, default is 500 ms
  //   placeholder: 'Enter your UserId',  // placeholder for number input
  //   withoutEmptyComparatorOption: true,  // dont render empty option for comparator
  //   withoutEmptyNumberOption: true,  // dont render empty option for number select if it is defined
  //   comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],  // Custom the comparators
  //   style: { display: 'inline-grid' }, // custom the style on number filter
  //   className: 'custom-numberfilter-class',  // custom the class on number filter
  //   comparatorStyle: { backgroundColor: 'antiquewhite' }, // custom the style on comparator select
  //   comparatorClassName: 'custom-comparator-class',  // custom the class on comparator select
  //   numberStyle: { backgroundColor: 'cadetblue', margin: '0px' },  // custom the style on number input/select
  //   numberClassName: 'custom-number-class',  // custom the class on ber input/select
  //   // defaultValue: { number: 2103, comparator: Comparator.GT },  // default value

  //   }),
  //     style: {
  //       width: "40%",
  //       textAlign: "center",
  //       bgColor: "#f0f8ff",
  //     },

  //   },

  //   { dataField: "name",
  //    text: "Name" ,
  //    filter: textFilter(
  //       {
  //         placeholder: "Search by name",
  //         className: "my-custom-filter",
  //         comparator: Comparator.LIKE,
  //         // delay: 1000,

  //         style: { display: "inline-block", width: "100%",backgroundColor: "white" },
  //       }
  //    )
  //   },
  //   { dataField: "animal",
  //    text: "Animal",
  //    sort: true,

  //   //  filter: multiSelectFilter({
  //   //   options: selectOptions,
  //   //   className: 'test-classname',
  //   //   withoutEmptyOption: true,
  //   //   // defaultValue: [0, 2],
  //   //   comparator: Comparator.LIKE, // default is Comparator.EQ
  //   //   style: { backgroundColor: 'white' },

  //   // })

  //    filter: selectFilter({
  //     options:selectOptions,

  //   //  className:"text-red-200",
  //     withoutEmptyOption: false,
  //     // defaultValue: 2,
  //     comparator: Comparator.LIKE, // default is Comparator.EQ
  //     style: { backgroundColor: 'white',
  //     width: '100%'},

  //   })
  //   },

  // ];
  // const columns = [
  //   {
  //     dataField: "id",
  //     text: "Id",
  //     sort: true,
  //     hidden: true,
  //   },
  //   {
  //     dataField: "userId",
  //     text: "UserId",
  //     sort: true,
  //     filter: numberFilter({
  //       getFilter: (filter) => {
  //         console.log(filter);
  //         return filter;
  //       },
  //       setFilter: (filter) => {
  //         console.log(filter);
  //         return filter;
  //       },
  //       Comparator: (a, b, filterParams) => {
  //         console.log(filterParams);
  //         return a - b;
  //       },
  //       style: {
  //         backgroundColor: "#f1f1f1",
  //         border: "1px solid #d4d4d4",
  //         borderRadius: "5px",
  //         padding: "5px",
  //         margin: "5px",
  //         width: "100%",
  //         display: "inline-block",
  //         fontSize: "14px",
  //         fontFamily: "sans-serif",
  //         fontWeight: "400",
  //         color: "#555",
  //         boxShadow: "inset 0 1px 1px rgba(0,0,0,.075)",
  //         transition:
  //           "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
  //         borderColor: "#ccc",
  //       },
  //     }),

  //     headerTitle: (column, colIndex) =>
  //       `this is custom title for ${column.text}`,
  //     style: {
  //       textAlign: "center",
  //       // fontWeight: "bold",
  //       fontSize: "18px",
  //       width: "80%",
  //     },
  //     headerStyle: (column, colIndex) => {
  //       return {
  //         width: "20%",
  //         textAlign: "center",
  //         fontWeight: "bold",
  //         fontSize: "18px",
  //       };
  //     },
  //   },
  //   {
  //     dataField: "title",
  //     text: "Title",
  //     sort: true,
  //     filter: textFilter({
  //       placeholder: "Search...",
  //     }),
  //     headerTitle: (column, colIndex) =>
  //       `this is custom title for ${column.text}`,
  //     style: {
  //       textAlign: "center",
  //       // fontWeight: "bold",
  //       // fontSize: "18px",
  //       width: "100%",
  //     },
  //     headerStyle: (column, colIndex) => {
  //       return {
  //         width: "60%",
  //         textAlign: "center",
  //         fontWeight: "bold",
  //         fontSize: "18px",
  //       };
  //     },

  //     editable: true,
  //     // classes: ["text-center text-wrap"],
  //     // className: "text-center text-wrap sm:text-sm overflow-hidden truncate ... ",
  //     classes: (cell, row, rowIndex, columnIndex) => {
  //       return "text-center text-wrap sm:text-sm overflow-hidden truncate ... ";
  //     },
  //     attrs: {
  //       title: "Click on Title field",
  //       style: {
  //         width: "100px",
  //           textAlign: "center",
  //         overflow: "hidden",

  //         //   display: "inline-block",

  //         verticalAlign: "middle",

  //         // lineHeight: "normal",
  //       },
  //     },
  //   },
  //   {
  //     dataField: "completed",
  //     text: "Completed",
  //     sort: true,
  //    filter: selectFilter({
  //        options:{
  //               0: 'true',
  //               1: 'false',
  //           },
  //           getFilter: (filter) => {
  //               console.log(filter);
  //               return filter;
  //           },
  //           defaultValue: 'true',
  //       }),

  //     headerTitle: (column, colIndex) =>
  //       `this is custom title for ${column.text}`,
  //     style: {
  //       textAlign: "center",
  //       // fontWeight: "bold",
  //       fontSize: "18px",
  //       width: "100%",
  //     },
  //     headerStyle: (column, colIndex) => {
  //       return {
  //         width: "30%",
  //         textAlign: "center",
  //         fontWeight: "bold",
  //         fontSize: "18px",
  //       };
  //     },
  //   },
  // ];

  const selectRow = {
    mode: "checkbox",
    // clickToSelect: true,
    bgColor: "rgb(238, 193, 213)",
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log(row);
      console.log(isSelect);
      console.log(rowIndex);
      console.log(e);
    },
    onSelectAll: (isSelect, rows, e) => {
      console.log(isSelect);
      console.log(rows);
      console.log(e);
    },
  };
  // overlay

  const expandRow = {
    renderer: (row) => (
      <div className="text-center grid justify-center">
        <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
        <p>{row.name}</p>
        <p>{row.animal}</p>
      </div>
    ),
    // expanded:[1], // default expend
    onExpand: (row, isExpand, rowIndex, e) => {
      console.log(row);
      console.log(isExpand);
      console.log(rowIndex);
      console.log(e);
    },
    showExpandColumn: true,
    expandByColumnOnly: true,
    onlyOneExpanding: true,
    expandColumnPosition: "right",
    className: ["text-center", "bg-red-200"],
    parentClassName: ["text-center", "bg-red-400"],

    expandHeaderColumnRenderer: ({ isAnyExpands }) => (
      <span>{isAnyExpands ? "-" : "+"}</span>
    ),
    expandColumnRenderer: ({ expanded }) => <span>{expanded ? "-" : "+"}</span>,
  };

  // const captions={
  //   paginationPosition: 'top',
  //   clearSearch: true,
  //   clearSearchBtn: true,
  //   clearSearchBtnStyle: {
  //     color: 'red',
  //     backgroundColor: 'yellow',
  //   },
  //   clearSearchBtnPosition: 'right',
  //   clearSearchBtnTooltip: 'Clear Search',
  //   searchDelayTime: 1000,
  //   searchPlaceholder: 'Search...',
  //   searchText: 'Search...',
  //   searchTooltip: 'Search',
  //   searchField: 'searchField',
  //   searchFieldPlaceholder: 'Search...',
  //   searchFieldTooltip: 'Search Field',
  //   searchFieldColumnTitle: 'Search Field',
  //   searchFieldColumnStyle: {
  //     width: '100px',
  //   },
  //   searchFieldColumnClasses: ['text-center'],
  //   searchFieldColumnAttrs: {
  //     title: 'Search Field',
  //   },
  //   searchFieldColumnFilter: {
  //     type: 'TextFilter',
  //     placeholder: 'Search...',
  //   },
  //   searchFieldColumnFilterValue: '',
  //   searchFieldColumnFilterAttrs: {
  //     placeholder: 'Search...',
  //   },
  //   searchFieldColumnFilterRenderer: ({ filter, onChange }) => (
  //     <input
  //       type="text"
  //       onChange={e => onChange(e.target.value)}
  //       value={filter ? filter.value : ''}
  //       placeholder="Search..."
  //     />
  //   ),
  //   searchFieldColumnFilterRendererParams: {
  //     placeholder: 'Search...',
  //   },
  //   searchFieldColumnFilterRendererProps: {
  //     placeholder: 'Search...',
  //   },
  //   searchFieldColumnFilterRendererAttrs: {
  //     placeholder: 'Search...',
  //   },
  //   searchFieldColumnFilterRendererStyle: {
  //     width: '100px',
  //   },
  //   searchFieldColumnFilterRendererClasses: ['text-center'],
  //   searchFieldColumnFilterRendererComponent: ({ filter, onChange }) => (
  //     <input

  //       type="text"
  //       onChange={e => onChange(e.target.value)}
  //       value={filter ? filter.value : ''}
  //       placeholder="Search..."
  //     />
  //   ),
  //   searchFieldColumnFilterRendererComponentParams: {
  //     placeholder: 'Search...',
  //   },
  //   searchFieldColumnFilterRendererComponentProps: {
  //     placeholder: 'Search...',
  //   },
  // }

  const CaptionElement = () => (
    <h3
      style={{
        borderRadius: "0.25em",
        textAlign: "center",
        color: "purple",
        border: "1px solid purple",
        padding: "0.5em",
      }}
    >
      {" "}
      This is remote table compoment
    </h3>
  );

  return (
    <div>
      <h2 className="grid justify-center text-center">
        BootstrapTable Filtering
      </h2>
      <div className="grid justify-center text-center  ">
        {/* create search field */}
        <div className="grid justify-center flex-inline  flex rounded-fully bg-gray-200 w-full border border-gray-300 rounded-md py-1 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1  ">
          {/* <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-inline relative    " >  */}
          <label class="relative block">
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg class="h-5 w-5 fill-gray-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
           
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
              value={searchinput}
              class="placeholder:italic placeholder:text-gray-400 block bg-white w-96 border border-gray-300 rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </label>
          {/* <button type="submit" className="px-1"><FaSearch/></button> */}
          {/* </form> */}
        </div>
      </div>
      <div>
        <BootstrapTable
          bootstrap4
          expandRow={expandRow}
          // filterPosition="top"
          keyField="id"
          // data={mocdata}
          data={search(mocData)}
          columns={columns}
          filter={filterFactory({
            defaultValue: "",
            delay: 1000,
            placeholder: "Search...",
            style: {
              backgroundColor: "#f1f1f1",
              border: "1px solid #d4d4d4",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
              width: "100%",
              display: "inline-block",
              fontSize: "14px",
              fontFamily: "sans-serif",
              fontWeight: "400",
              color: "#555",
              boxShadow: "inset 0 1px 1px rgba(0,0,0,.075)",
              transition:
                "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
              borderColor: "#ccc",
            },
          })}
          filterPosition="top"
          onTableChange={(action, tableState) => {
            console.log(action);
            console.log(tableState);
          }}
          // remote={{
          //   filter: false,
          //   pagination: true,
          //   sort: false,
          //   cellEdit: false,
          // }}
          noDataIndication="No data to display"
          responsive
          wrapperClasses="table-responsive"
          headerClasses="bg-secondary text-white"
          headerwrapClasses="py-2"
          bodyClasses="table-responsive"
          bodyWrapperClasses="table-responsive"
          loading={true}
          rowstyle={(row, rowIndex) => {
            return {
              backgroundColor: rowIndex % 2 === 0 ? "#F8F8F8" : "#FFFFFF",
            };
          }}
          // rowEvents={{
          //   onClick: (e, row, rowIndex) => {
          //     console.log(e);
          //     console.log(row);
          //     console.log(rowIndex);
          //   },
          // }}
          rowclass={(row, rowIndex) => {
            return {
              backgroundColor: rowIndex % 2 === 0 ? "#F8F8F8" : "#FFFFFF",
            };
          }}
          pagination={paginationFactory()}
          // bordered={false}
          caption={CaptionElement}
          selectRow={selectRow}
          border
          striped
          hover
          condensed
          style={{
            backgroundColor: "#f1f1f1",
            border: "1px solid #d4d4d4",
            borderRadius: "5px",
            padding: "5px",
            margin: "5px",
            width: "100%",
            display: "block",
            wrap: "wrap",
            fontSize: "14px",
            fontFamily: "sans-serif",
            fontWeight: "400",
            color: "#555",
            boxShadow: "inset 0 1px 1px rgba(0,0,0,.075)",
            transition:
              "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
            borderColor: "#ccc",
            overflow: "hidden",
            emptyCells: "hide",
          }}
        />
      </div>
    </div>
  );
}

export default Filterdata;
