import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <ClipLoader color="#000" size={100} />
    </div>
  );
};

export default Spinner;