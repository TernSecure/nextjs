"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { ternSecureAuth} from "../../utils/client-init";

interface UseUserReturn {
    user: any | null;
    loading: boolean;
  }

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<any| null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(ternSecureAuth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {user, loading};
}
