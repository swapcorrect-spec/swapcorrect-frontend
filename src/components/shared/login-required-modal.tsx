import { FC } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, ArrowRight, X } from "lucide-react";

type LoginRequiredModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
  title?: string;
  description?: string;
  actionText?: string;
};

const LoginRequiredModal: FC<LoginRequiredModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
  title = "Login Required",
  description = "You need to be logged in to swap items. Please sign in to continue with your swap.",
  actionText = "Go to Login",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="left-[50%] max-w-[500px] translate-x-[-50%] p-6">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          {/* Icon */}
          <div className="bg-[#007AFF]/10 rounded-full p-4">
            <LogIn className="h-8 w-8 text-[#007AFF]" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              {description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={onLogin}
              className="flex-1 bg-[#007AFF] hover:bg-[#0056CC] text-white flex items-center justify-center gap-2"
            >
              {actionText}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Additional info */}
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={onSignup}
              className="text-[#007AFF] hover:underline font-medium"
            >
              Sign up here
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginRequiredModal;

