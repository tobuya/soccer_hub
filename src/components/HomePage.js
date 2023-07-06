/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowRightCircle, FiArrowLeftCircle } from 'react-icons/fi';
import { fetchData } from '../Redux/Competition/competition';

const Competition = () => {
  const dispatch = useDispatch();
  const matchesByCompetition = useSelector(
    (state) => state.soccer.matchesByCompetition,
  );

  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [searchCompetitionName, setCompetitionSearchName] = useState('');

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleCompetitionClick = (competitionName) => {
    setSelectedCompetition(competitionName);
  };

  const handleMatchClose = () => {
    setSelectedCompetition(null);
  };

  return (
    <>
      <div className="input-group mt-2 input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg">Competition</span>
        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={searchCompetitionName} onChange={(event) => setCompetitionSearchName(event.target.value)} placeholder="Enter competition name ..." />
      </div>
      <div className="d-flex flex-fill flex-wrap m-3 border css-style background">
        {selectedCompetition ? (
          <div className="d-flex flex-column gap-3">
            <FiArrowLeftCircle onClick={handleMatchClose} className="mb-4  hover" />
            {matchesByCompetition[selectedCompetition].map((match) => (
              <div key={match.matchId} className="d-flex flex-column mb-4 flex-grow-1 css-style ms-5">
                <div className="d-flex justify-content-between">
                  <p className="fw-bolder">{match.matchTitle}</p>
                  <p className="fw-bolder">{new Date(match.datePlayed).toDateString()}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <img src={match.thumbnail} alt="Match" width="49.5%" className="highlight" />
                  <div dangerouslySetInnerHTML={{ __html: match.highlightsVideo }} style={{ width: '49.5%' }} className="highlight" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          Object.keys(matchesByCompetition)
            .filter(
              (competitionName) => competitionName
                .toLowerCase()
                .includes(searchCompetitionName.toLowerCase()),
            )
            .map((competitionName) => (
              <div key={competitionName} className="d-flex align-items-center justify-content-center flex-grow-1">
                <button type="button" className="d-flex gap-5 p-5 flex-fill align-items-center justify-content-center" onClick={() => handleCompetitionClick(competitionName)}>
                  <FiArrowRightCircle className="order-1" />
                  {competitionName}
                </button>
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default Competition;
