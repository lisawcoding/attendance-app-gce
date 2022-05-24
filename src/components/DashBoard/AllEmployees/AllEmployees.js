import { useContext, useState, useEffect } from "react";
import "./AllEmployees.scss";
import { DataContext } from "../../../contexts/DataContext";
import AllEmployeesCards from "./AllEmployeesCards";
import Loader from "../../Common/Loader";
import { CreateEmployeeLink } from "../../Common/IconLinks";
import SearchDiv from "./SearchDiv";

function AllEmployees () {
     const { allEmployees, isLoading, setIsLoading } = useContext(DataContext);
     const [ searchTerm, setSearchTerm ] = useState("");

     const changeSearchInput = e => setSearchTerm(e.target.value);

     useEffect(() => {
          if(document.readyState!=="complete") setIsLoading(true)
     }, [])

     return (
          <>
          { isLoading ? <Loader /> : 
               <main id="AllEmployees">
                    <SearchDiv changeSearchInput={changeSearchInput} searchTerm={searchTerm} />
                    {allEmployees && (allEmployees.length<1 ? 
                         <h1 className="center">no employees<CreateEmployeeLink/></h1> : 
                         <AllEmployeesCards allEmployees={allEmployees} searchTerm={searchTerm.toLowerCase()} />)}  
               </main>          
          }          
          </>
     );
}

export default AllEmployees;