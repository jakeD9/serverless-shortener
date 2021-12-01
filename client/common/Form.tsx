import { useState } from "react";
import { useForm } from "react-hook-form";

import { UrlForm, UrlData } from "./models";

export const Form: React.FC = () => {
  const [urlData, setUrlData] = useState<UrlData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  // TODO: use axios instead of 🤢 fetch 🤢 for built in error handling 
  const submit = async (form: UrlForm) => {
    // clear state
    setUrlData(null);
    setError('');
    setLoading(true);
    // post request
    await fetch("/api/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          return data.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        // clear loading and any errors, display data
        setUrlData(data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        const errJSON = JSON.parse(err.message);
        setLoading(false);
        setError(errJSON.message);
        setUrlData(null);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("url")} />
        <input {...register("requestedKey")} />
        <input type="submit" />
      </form>
      <br />
      {urlData ? <div>UrlData has been received</div> : null}
      {error ? <div>{error}</div> : null}
      {isLoading ? <div> Loading...</div> : null}
    </div>
  );
};
