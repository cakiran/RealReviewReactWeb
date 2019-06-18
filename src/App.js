import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Spinner } from 'react-bootstrap';
import RealReviewScore from './realreviewscore.js';

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
    crossorigin: true,
    'Content-Type':'application/json'
  },
};

function App() {

  const [searchTxt, setSearchTxt] = useState("");
  const [location, setLocation] = useState("");
  const [resp, setBusinessData] = useState({ businessData: [] });
  const [url, setBusinessDataUrl] = useState(`http://localhost:52743/api/YelpMI/businesses/${searchTxt}/${location}`);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBusiness,setBusiness] = useState({});
  const [realReviewScoreData,setRealReviewScore] = useState({"reviews":[],"realReviewScore":0});
  const [isRealReviewScoreLoading, setIsRealReviewScoreLoading] = useState(false);
  useEffect(() => {
    if (searchTxt === "" || location === "")
      return;
    const fetchData = async () => {

      setIsLoading(true);
      const respGlobal = await axios(url, config);
      setBusinessData({ businessData: respGlobal.data });
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    if (searchTxt === "" || location === "" || selectedBusiness == {})
      return;
    const fetchData = async () => {
      setIsRealReviewScoreLoading(true);
      const resp = await axios({method:'post', url : 'http://localhost:52743/api/YelpMI/businesses/realreviewscore', data:{"name":selectedBusiness.name,"city":selectedBusiness.city,"reviews":selectedBusiness.reviews}, headers:config});
      setRealReviewScore( resp.data );
      setIsRealReviewScoreLoading(false);
    };
    fetchData();
  }, [selectedBusiness]);

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-md navbar-dark bg-info mb-3">
        <div className="container-fluid">
          <a href="#" className="navbar-brand mr-3">Real Review</a>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <form className="card card-sm">
              <div className="card-body row  align-items-center">
                <div className="col-auto">
                  <i className="fas fa-search h4 text-body"></i>
                </div>
                <div className="col">
                  <input className="form-control form-control-lg form-control-borderless" value={searchTxt} onChange={event => setSearchTxt(event.target.value)} type="search" placeholder="Business search (e.g. pizza,cupcakes etc.)" />
                </div>
                <div className="col">
                  <input className="form-control form-control-lg form-control-borderless" value={location} onChange={event => setLocation(event.target.value)} type="search" placeholder="Location (zipcode,city)" />
                </div>
                <div className="col-auto">
                  <button className="btn btn-lg btn-warning" type="submit" onClick={(e) => { setBusinessDataUrl(`http://localhost:52743/api/YelpMI/businesses/${searchTxt}/${location}`); e.preventDefault(); }}> {isLoading === true ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : 'Search'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <br />
        <div className="row d-flex">
          <div className="col-2" id="business">
            <div className="flex-column left p-1">
              {
                isLoading === true ? <div className="card card-block mb-1">
                  <div className="card-header text-white bg-info">Loading...</div>
                  <div className="card-body">
                    Loading...
                  </div>
                  </div>
                  :
                  resp.businessData.map((item, index) => (
                    <div key={index} className="card card-block mb-1" onClick={() => setBusiness(item) } >
                      <div className="card-header text-white bg-info"><a>{item.name}</a></div>
                      <div className="card-body">
                        <div>{item.phone}</div>
                        <div>{item.address}</div>
                        <div>{item.city}</div>
                        <div>{item.state}</div>
                        <div>{item.zipCode}</div>
                      </div>
                    </div>
                  ))}

            </div>
          </div>

          <div className="col-10 ">
        <RealReviewScore {...realReviewScoreData} isRealReviewScoreLoading={isRealReviewScoreLoading} />
          </div>
        </div>
        ''
      </div>
    </div>

  );
}

export default App;
