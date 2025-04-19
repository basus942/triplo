interface ItineraryItem {
    day: number;
    theme: string;
    morning?: {
      activity?: string;
      timing?: string;
      notes?: string;
      budget?: string;
      food?: {
        breakfast?: string;
      };
    };
    afternoon?: {
      activity?: string;
      timing?: string;
      notes?: string;
      budget?: string;
      food?: {
        lunch?: string;
        dinner?: string;
      };
    };
    evening?: {
      activity?: string;
      timing?: string;
      notes?: string;
      budget?: string;
      food?: {
        dinner?: string;
      };
      offbeat?: string;
    };
  }
interface TripData {
    tripName: string;
    destination: string;
    duration: string;
    groupSize: string;
    month: string;
    theme: string;
    overallTone: string;
    perPersonBudget: number;
    totalBudget: number;
    itinerary: ItineraryItem[];
    budgetBreakdown?: {
      accommodation?: string;
      food?: string;
      travel?: string;
      activities?: string;
    };
    costConsciousTips?: string[];
    importantNotes?: string[];
    summary?: string;
  }

// Function to check if a string is empty or undefined
const isValid = (value: unknown) => value !== undefined && value !== null && value !== "";
export const TripDetails: React.FC<{ data: TripData }> = ({ data })=> {
    return (
        <div className="trip-data bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{data.tripName}</h1>
            <p className="text-gray-600">
              {data.destination} | {data.duration} | Group Size: {data.groupSize}
            </p>
            <p className="text-gray-600">
              Month: {data.month} | Theme: {data.theme} | Tone: {data.overallTone}
            </p>
            <p className="text-gray-600">
              Per Person Budget: ₹{data.perPersonBudget} | Total Budget: ₹{data.totalBudget}
            </p>
          </header>
    
          {/* Itinerary Section */}
          <div className="itinerary space-y-6">
            {data.itinerary.map((item: ItineraryItem) => (
              <div key={item.day} className="day border-l-4 border-cyan-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800">Day {item.day}: {item.theme}</h2>
                {/* Morning */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-700">Morning</h3>
                  {isValid(item.morning?.activity) && <p>{item.morning?.activity}</p>}
                  {isValid(item.morning?.timing) && <p><strong>Timing:</strong> {item.morning?.timing}</p>}
                  {isValid(item.morning?.notes) && <p><strong>Notes:</strong> {item.morning?.notes}</p>}
                  {isValid(item.morning?.budget) && <p><strong>Budget:</strong> {item.morning?.budget}</p>}
                  {isValid(item.morning?.food?.breakfast) && (
                    <p><strong>Breakfast:</strong> {item.morning?.food?.breakfast}</p>
                  )}
                </div>
                {/* Afternoon */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-700">Afternoon</h3>
                  {isValid(item.afternoon?.activity) && <p>{item.afternoon?.activity}</p>}
                  {isValid(item.afternoon?.timing) && <p><strong>Timing:</strong> {item.afternoon?.timing}</p>}
                  {isValid(item.afternoon?.notes) && <p><strong>Notes:</strong> {item.afternoon?.notes}</p>}
                  {isValid(item.afternoon?.budget) && <p><strong>Budget:</strong> {item.afternoon?.budget}</p>}
                  {isValid(item.afternoon?.food?.lunch) && (
                    <p><strong>Lunch:</strong> {item.afternoon?.food?.lunch}</p>
                  )}
                  {isValid(item.afternoon?.food?.dinner) && (
                    <p><strong>Dinner:</strong> {item.afternoon?.food?.dinner}</p>
                  )}
                </div>
                {/* Evening */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-700">Evening</h3>
                  {isValid(item.evening?.activity) && <p>{item.evening?.activity}</p>}
                  {isValid(item.evening?.timing) && <p><strong>Timing:</strong> {item.evening?.timing}</p>}
                  {isValid(item.evening?.notes) && <p><strong>Notes:</strong> {item.evening?.notes}</p>}
                  {isValid(item.evening?.budget) && <p><strong>Budget:</strong> {item.evening?.budget}</p>}
                  {isValid(item.evening?.food?.dinner) && (
                    <p><strong>Dinner:</strong> {item.evening?.food?.dinner}</p>
                  )}
                  {isValid(item.evening?.offbeat) && (
                    <p><strong>Offbeat Activity:</strong> {item.evening?.offbeat}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
    
          {/* Budget Breakdown Section */}
          <footer className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Budget Breakdown</h2>
            <div className="space-y-2 mt-4">
              {isValid(data.budgetBreakdown?.accommodation) && (
                <p><strong>Accommodation:</strong> {data.budgetBreakdown?.accommodation}</p>
              )}
              {isValid(data.budgetBreakdown?.food) && (
                <p><strong>Food:</strong> {data.budgetBreakdown?.food}</p>
              )}
              {isValid(data.budgetBreakdown?.travel) && (
                <p><strong>Travel:</strong> {data.budgetBreakdown?.travel}</p>
              )}
              {isValid(data.budgetBreakdown?.activities) && (
                <p><strong>Activities:</strong> {data.budgetBreakdown?.activities}</p>
              )}
            </div>
          </footer>
    
          {/* Cost-Conscious Tips Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Cost-Conscious Tips</h2>
            <ul className="list-disc list-inside mt-4">
              {data.costConsciousTips?.map((tip: string, index: number) => (
                <li key={index} className="text-gray-700">{tip}</li>
              ))}
            </ul>
          </section>
    
          {/* Important Notes Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Important Notes</h2>
            <ul className="list-disc list-inside mt-4">
              {data.importantNotes?.map((note: string, index: number) => (
                <li key={index} className="text-gray-700">{note}</li>
              ))}
            </ul>
          </section>
    
          {/* Summary Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
            <p className="text-gray-700">{data.summary}</p>
          </section>
        </div>
      );
}
