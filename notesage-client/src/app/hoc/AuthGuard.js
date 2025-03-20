import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AuthGuard = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = Cookies.get("token"); // Read the auth cookie
      if (!token) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) return <p>Loading...</p>; // Show loading while redirecting

    return <WrappedComponent {...props} />;
  };
};

export default AuthGuard;