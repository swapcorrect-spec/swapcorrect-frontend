import { FC } from "react";
import { Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  subtitle?: string;
  description: string;
  showActionButton?: boolean;
  actionButtonText?: string;
  onActionClick?: () => void;
};

const EmptyState: FC<EmptyStateProps> = ({
  title,
  subtitle,
  description,
  showActionButton = false,
  actionButtonText = "Get Started",
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        <Package className="h-12 w-12 text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-semibold mb-2 text-[#007AFF]">{title}</h3>
      {subtitle &&
      <h4 className="text-lg font-medium text-gray-700 mb-3">{subtitle}</h4>}
      <p className="text-[#737373] max-w-md mb-8">{description}</p>
      
      {showActionButton && (
        <Button 
          onClick={onActionClick}
          className="bg-[#007AFF] hover:bg-[#0056CC] text-white px-6 py-3 rounded-full flex items-center gap-2"
        >
          {actionButtonText}
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
