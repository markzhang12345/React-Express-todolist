import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function Home() {
  const router = useRouter();
  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.user) router.push("/todolist");
    else router.push("/login");
  }, [cookies, router]);

  return null;
}
