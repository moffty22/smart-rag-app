import React, { useState } from "react";
import { generateQuestions } from "../services/api";

const QuestionGenerator = ({ extractedText }) => {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!extractedText) {
      setError("No extracted text available for generating questions.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generateQuestions(extractedText);

      // Handle response format dynamically
      if (result.questions) {
        setQuestions(result.questions);
      } else {
        setError("No questions generated. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while generating questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-md shadow-sm bg-gray-50">
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Similar Questions"}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {questions && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Similar Questions:</h2>
          {Array.isArray(questions) ? (
            <ul className="mt-2 list-disc list-inside">
              {questions.map((q, index) => (
                <li key={index}>{q}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2">{questions}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionGenerator;

