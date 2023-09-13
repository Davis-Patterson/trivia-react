import ProgressBar from 'react-animated-progress-bar';
import PropTypes from 'prop-types';

const Progress = ({ progress, setProgress }) => {
  const validProgress =
    Number.isFinite(progress) && progress >= 0 && progress <= 100
      ? progress
      : 0;

  ProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired,
  };

  // console.log(`Progress: ${progress}`);
  // console.log(`validProgress: ${validProgress}`);

  return (
    <>
      <div className='progressContainer' onClick={() => setProgress(0)}>
        <ProgressBar
          className='progress-bar'
          width='60'
          trackWidth='50'
          percentage={validProgress}
          defColor={{
            fair: 'white',
            good: 'white',
            excellent: 'white',
            poor: 'white',
          }}
          fontColor='white'
        />
      </div>
    </>
  );
};
export default Progress;
