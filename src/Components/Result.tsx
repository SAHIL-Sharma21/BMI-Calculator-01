import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultProps {
  bmiValue: string;
}

export const Result = ({ bmiValue }: ResultProps) => {
  const numericBmi = parseFloat(bmiValue);

  if (isNaN(numericBmi)) {
    return (
      <Card className="mt-4 w-full max-w-sm mx-auto shadow-lg bg-gray-800 text-white">
        <CardContent className="p-6 text-center">
          <p className="text-red-400 text-lg font-medium">Invalid BMI value</p>
        </CardContent>
      </Card>
    );
  }

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Healthy weight";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    return "Obese";
  };

  const getIndicatorColor = (bmi: number) => {
    if (bmi < 18.5) return "text-red-400";
    if (bmi >= 18.5 && bmi <= 24.9) return "text-green-400";
    if (bmi >= 25 && bmi <= 29.9) return "text-yellow-400";
    return "text-red-500";
  };

  const category = getBmiCategory(numericBmi);
  const colorClass = getIndicatorColor(numericBmi);

  return (
    <Card className="mt-4 w-full max-w-sm mx-auto shadow-lg bg-gray-800 text-white hover:scale-105 transition-transform duration-300">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">BMI Result</CardTitle>
      </CardHeader>
      <CardContent className="p-5 text-center">
        <p className={`text-xl font-semibold ${colorClass}`}>
          Your BMI is: {numericBmi.toFixed(1)}
        </p>
        <p className="text-md text-gray-400 mt-2">Category: {category}</p>
      </CardContent>
    </Card>
  );
};
