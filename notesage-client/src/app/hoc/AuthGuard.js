import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AuthGuard = (WrappedComponent) => {
  const WithAuthGuard = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };

  // display name for better debugging and ESLint compliance
  WithAuthGuard.displayName = `AuthGuard(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthGuard;
};

export default AuthGuard;
