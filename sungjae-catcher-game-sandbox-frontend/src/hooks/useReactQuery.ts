/* eslint-disable no-restricted-globals */
import axios from "axios";
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useQueryFetchGet = (
  fetchUrl: string,
  queryKey: any[],
  enableFetch?: boolean,
  setFn?: Dispatch<SetStateAction<any>>,
  refetchInterval?: number,
  refetchOnWindowFocus?: boolean,
  cacheTime?: number,
  onSuccess?: (ar: any) => void,
  onError?: (ar: any) => void
) => {
  const { status, data, isFetching, refetch, isError } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const data = await axios.get(fetchUrl);
      const json = data.data;
      return json;
    },
    onSuccess: onSuccess
      ? onSuccess
      : (data: any) => {
          // If status if success then assgin the datasource
          if (data?.status === 200) {
            console.log("Success", data);
            if (_.isArray(data?.data)) {
              if (setFn) setFn(data?.data);
            }
          }
        },
    onError: onError
      ? onError
      : (error: any) => {
          console.log(error);
          alert(
            "Your request had failed. There is something wrong with server. Please try again."
          );
        },
    refetchInterval: refetchInterval ? refetchInterval : 30000, // Update record in every 5 min
    refetchOnWindowFocus: refetchOnWindowFocus ? refetchOnWindowFocus : false,
    cacheTime: cacheTime ? cacheTime : 5000,
    enabled: enableFetch ? enableFetch : true,
  });

  return { status, data, isFetching, isError, refetch };
};

export const useQueryPostMutation = (
  fetchUrl: string,
  queryKey: any[],
  refetch?: () => void,
  onSuccessFunction?: any,
  onErrorFunction?: any
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const addParam = async (addingParam?: any) => {
    return await axios.post(fetchUrl as string, addingParam, {});
  };

  return useMutation({
    mutationFn: addParam,
    onSuccess: onSuccessFunction
      ? onSuccessFunction
      : (data: any) => {
          console.log("Sucess", data);
          // If status if success then assgin the datasource
          if (data?.data?.status === "success") {
            alert("Request is Successful.");
            if (refetch) refetch();
            navigate("/board");
          }
          queryClient.invalidateQueries({ queryKey });
        },
    onError: onErrorFunction
      ? onErrorFunction
      : (error: any) => {
          console.log(error);
          alert(
            "Your request had failed. There is something wrong with server. Please try again."
          );
          navigate("/menu");
        },
  });
};
