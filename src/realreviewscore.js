import React from 'react';
import { ProgressBar } from 'react-bootstrap';

function RealReviewScore(reviewData) {
    const now = reviewData.reviewData.realReviewScore ? reviewData.reviewData.realReviewScore : 0;
    return (
        <div>
            <div className="card  card-block">
                <div className="card-header text-white bg-info">Reviews - {reviewData.reviewData.name}</div>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            reviewData.isRealReviewScoreLoading === true ? <li className="list-group-item">Loading...</li> :
                                reviewData.reviewData.reviews.map((item, index) => (
                                    <li key={index} className="list-group-item">{item}</li>
                                ))
                        }
                    </ul>
                </div>
            </div>

            <br />

            <div className="card card-block">
                <div className="card-header text-white bg-info">Real Review Score</div>
                <div className="card-body  d-flex flex-column">
                    {reviewData.isRealReviewScoreLoading === true ? <div class="d-flex  ">
                        <div class="p-2 m-1 flex-fill border border-dark rounded align-self-center ">
                            Loading...
                        </div>
                    </div>
                        :
                        <div class="d-flex  ">
                            <div class="p-2 m-1 flex-fill border border-light rounded align-self-center ">
                                <span className="text-info">Accuracy:</span>{' '}{reviewData.reviewData.accuracy}
                            </div>
                            <div class="p-2 m-1 flex-fill border border-light rounded align-self-center ">
                                <span className="text-info">Area Under ROCCurve:</span>{' '}{reviewData.reviewData.areaUnderROCCurve}
                            </div>
                            <div class="p-2 m-1 flex-fill border border-light rounded align-self-center ">
                                <span className="text-info"> F1 Score:</span>{' '}{reviewData.reviewData.f1Score}
                            </div>
                        </div>

                    }

                </div>
                <div className="card-body  d-flex flex-column">
                    <div class="d-flex  ">
                        <div class="p-2 m-1 flex-fill border border-info rounded align-self-center ">
                            <ProgressBar animated className="progress-bar-orange" variant="warning" striped now={now} label={`${now}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RealReviewScore;