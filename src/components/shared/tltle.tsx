import { FC } from "react";

interface Props {
  title: string;
  description: string;
}

const Title: FC<Props> = ({ title, description }) => {
  return (
        <div className="flex flex-col gap-2 font-medium">
          <p className="text-[#007AFF] text-sm">{title}</p>
          <p className="text-[#222222] text-xl">{description}</p>
        </div>
  
  );
};

export default Title;