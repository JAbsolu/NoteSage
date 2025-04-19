import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/util/cookies";

const AuthCheck = (WrappedComponent) => {
  const WithAuthCheck = (props) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const token = getCookie("token");

      if (token) {
        router.replace("/dashboard");
      } else {
        setIsChecking(false);
      }
    }, [router]);

    if (isChecking) return null;

    return <WrappedComponent {...props} />;
  };

  // display name for easier debugging and ESLint compliance
  WithAuthCheck.displayName = `AuthCheck(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithAuthCheck;
};

export default AuthCheck;
