import VerifyClient from "@/app/(auth)/verify";

type Props = {
  searchParams: {
    email: string;
    token: string;
  };
};
const Verify = ({ searchParams }: Props) => {
  return (
    <div>
      <VerifyClient searchParams={searchParams} />
    </div>
  );
};

export default Verify;
