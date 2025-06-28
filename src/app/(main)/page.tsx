import Main from "@/app/(main)/main";

export default function MainPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Main>{children}</Main>;
}
