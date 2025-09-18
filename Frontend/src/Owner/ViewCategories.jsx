import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices"

export default function ViewCategories(){

  const[categoryData,setCategoryData] = useState([])

  useEffect(() =>{
    apiServices.getallCategory()
    .then((res) =>{
      setCategoryData(res.data.data)
    } )
  },[])
    return(
        <>
        <>
        <>
  {/* Page Header Start */}
  <div className="container-fluid page-header">
    <h1 className="display-3 text-uppercase text-white mb-3">View Categories</h1>
    <div className="d-inline-flex text-white">
      <h6 className="text-uppercase m-0">
        <a className="text-white" href="">
          Dashboard
        </a>
      </h6>
      <h6 className="text-body m-0 px-3">/</h6>
      <h6 className="text-uppercase text-body m-0">View Categories</h6>
    </div>
  </div>
  {/* Page Header Start */}
  {/* Services Start */}
  <div className="container-fluid py-5">
    <div className="container pt-5 pb-3">
      <h1 className="display-4 text-uppercase text-center mb-5">
        Categories
      </h1>
      <div className="row">
       {
        categoryData?.map((el,index) =>(
          <>
           <div className="col-lg-4 col-md-6 mb-2">
          <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div
                className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                style={{ width: 80, height: 80 }}
              >
               <img src={BASE_IMAGE_URL + el.categoryImage} className="ms-3" height={"100px"} width={"100px"} />
              </div>
              <h1 className="display-2 text-white mt-n2 m-0">{index+1}</h1>
            </div>
            <h4 className="text-uppercase mb-3">{el.categoryName}</h4>
            <p className="m-0">
             {el.description}
            </p>
          </div>
        </div>
          </>
        ))
       }
        
      </div>
    </div>
  </div>
  {/* Services End */}
</>

</>

        </>
    )
}