// import './App.css'
import './Improve.module.css'
import SkipSelector from './components/SkipSelector';

function App() {
  // Replace 'any' with a more specific type or 'unknown' if the type is not yet defined
  const handleContinue = (skip: unknown) => {
    console.log('Selected skip:', skip);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <SkipSelector postcode="NR32" area="Lowestoft" onContinue={handleContinue} />
    </main>
  );
}

export default App
