type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const AuthForm: React.FC<Props> = ({ title, subtitle, children }) => {
  return (
    <div className="w-[100%] mt-10 md:mt-0 md:w-[90%] mx-auto">
      <h1 className="text-[#000000] text-2xl md:text-4xl text-center font-medium">
        {title}
      </h1>
      <p className="text-[#737373] text-base font-normal w-[80%] md:w-[50%] mx-auto text-center mt-2 mb-8 leading-tight">
        {subtitle}
      </p>
      <>{children}</>
    </div>
  );
};

export default AuthForm;
