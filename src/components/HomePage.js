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

  const getMatchCount = (competitionName) => {
    const matches = matchesByCompetition[competitionName];
    return matches ? matches.length : 0;
  };

  return (
    <>
      <div className="input-group px-5 py-2">
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing"
          value={searchCompetitionName}
          onChange={(event) => setCompetitionSearchName(event.target.value)}
          placeholder="Enter the competition name ..."
        />
      </div>

      <div className="d-flex flex-wrap mx-4 mb-3">
        {selectedCompetition ? (
          <div className="d-flex flex-lg-row flex-wrap w-100 m-2 col-lg-4 col-md-6 col-sm-12 flex-sm-column">
            {matchesByCompetition[selectedCompetition].map((match) => (
              <main key={matchesByCompetition[selectedCompetition].id} className="flex-grow-1 m-lg-2 m-sm-1 col-lg-5 col-md-12 border border-seconday shadow-lg rounded">
                <FiArrowLeftCircle onClick={handleMatchClose} className="m-lg-2 m-sm-1 hover" />
                <div key={match.matchId} className="d-flex flex-column mb-2 mx-lg-3 mx-sm-2">
                  <div className="d-flex justify-content-between">
                    <p className="fw-bolder match-title">{match.matchTitle}</p>
                    <p className="fw-bolder match-date">{new Date(match.datePlayed).toDateString()}</p>
                  </div>
                  <div className="">
                    <div dangerouslySetInnerHTML={{ __html: match.highlightsVideo }} className="highlight" />
                  </div>
                </div>
              </main>
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
              <div key={competitionName} className="d-flex align-items-center justify-content-center flex-grow-1 col-lg-4 col-md-6">
                <button type="button" className="d-flex flex-column gap-3 p-5 flex-fill align-items-center justify-content-center flex-1" onClick={() => handleCompetitionClick(competitionName)}>
                  <FiArrowRightCircle className="order-1" />
                  {competitionName}
                  <p className="text-muted">
                    Total Matches:
                    {' '}
                    {getMatchCount(competitionName)}
                  </p>
                </button>
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default Competition;
