import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import { PATHS } from "../_constants/paths";
import Main from "@/app/(main)/main";

export default function MainPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const isLoggedIn = localStorage.getItem("user") ?? null;
  // if (!isLoggedIn) {
  //   router.push(`/${PATHS.LOGIN}`);
  // }
  return <Main>{children}</Main>;
}
