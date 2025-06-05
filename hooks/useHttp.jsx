import { useState } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequests = async (requestConfig, applyData, applyError = () => {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = requestConfig.headers ? { ...requestConfig.headers } : {};
      const access_token = localStorage.getItem("access_token");

      if (requestConfig.url_info?.is_auth_required && access_token && !headers.authorization) {
        headers["authorization"] = `Bearer ${access_token}`;
      }

      let url = requestConfig?.url_info?.url;
      console.log(requestConfig)

      // Handle query params
      if (requestConfig.params) {
        const query = new URLSearchParams(requestConfig.params).toString();
        url += `?${query}`;
      }

      const options = {
        method: requestConfig.method ? requestConfig.method.toUpperCase() : "GET",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      };

      if (options.method !== "GET" && requestConfig.data) {
        options.body = JSON.stringify(requestConfig.data);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        applyError(errorData);
      } else {
        const data = await response.json();
        applyData(data);
      }

    } catch (err) {
      console.error(err);
      if (!error) {
        setError({
          general: ["Something went wrong. Please try again later."],
        });
        applyError({
          general: ["Something went wrong. Please try again later."],
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    sendRequests,
  };
}

export default useHttp;
