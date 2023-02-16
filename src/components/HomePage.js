import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../Redux/Competition/competition';

function Competition() {
  const dispatch = useDispatch();
  const matchesByCompetition = useSelector(
    (state) => state.soccer.matchesByCompetition,
  );

  const [selectedCompetition, setSelectedCompetition] = useState(null);

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
    <div className="d-flex flex-fill justify-content-center flex-wrap m-5 border border-danger">
      {selectedCompetition ? (
        <div className="d-flex flex-column gap-3 my-5">
          <button type="button" onClick={handleMatchClose} className="w-25">Close Matches</button>
          {matchesByCompetition[selectedCompetition].map((match) => (
            <div key={match.matchId} className="d-flex flex-column border border-success flex-grow-1">
              <div className="d-flex justify-content-between mx-3 mb-0">
                <p>{match.matchTitle}</p>
                <p>{match.datePlayed}</p>
              </div>
              <div className="d-flex justify-content-between mx-3 mt-0">
                <img src={match.thumbnail} alt="Thumbnail" width="50%" />
                <video src={match.highlightsVideo} muted width="50%" controls />
              </div>
            </div>
          ))}
        </div>
      ) : (
        Object.keys(matchesByCompetition).map((competitionName) => (
          <div key={competitionName}>
            <button type="button" onClick={() => handleCompetitionClick(competitionName)}>
              {competitionName}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Competition;
