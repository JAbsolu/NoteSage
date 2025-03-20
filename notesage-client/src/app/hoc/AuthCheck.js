import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/util/cookies";

const AuthCheck = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true); // Prevent page rendering until checked

    useEffect(() => {
      const token = getCookie("token");

      if (token) {
        router.replace("/dashboard"); // Redirect immediately
      } else {
        setIsChecking(false); // Allow rendering if not authenticated
      }
    }, [router]);

    if (isChecking) return null; // Prevents flickering before redirect

    return <WrappedComponent {...props} />;
  };
};

export default AuthCheck;
