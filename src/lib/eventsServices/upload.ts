import Cookies from "js-cookie";

async function uploadEServiceFn({
  formDataBody,
  setErrMsg,
}: {
  formDataBody: FormData;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<{ message: string } | undefined> {
  const url = `https://e-venues.ooshinfo.com/api/v1/eventServices`;
  const token = Cookies.get("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formDataBody,
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;
    console.log(errorMsg);

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data: { message: string } = await res.json();

  return data;
}

export default uploadEServiceFn;
