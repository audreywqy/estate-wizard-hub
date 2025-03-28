
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightgray p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="bg-navy p-4 rounded-full">
            <Building className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-navy">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! The property you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mb-8">
          The page at {location.pathname} could not be found. It might have been moved or doesn't exist anymore.
        </p>
        <Button asChild size="lg" className="bg-teal hover:bg-teal/90">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
