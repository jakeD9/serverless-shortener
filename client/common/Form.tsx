import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import styled from "styled-components";
import { Puff } from "react-loading-icons";

import { UrlForm, UrlData } from "./models";

export const FormDisplay: React.FC = () => {
  const [urlData, setUrlData] = useState<UrlData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  // TODO: use axios instead of 🤢 fetch 🤢
  const submit = async (form: UrlForm) => {
    // clear state
    setUrlData(null);
    setError("");
    setLoading(true);
    // don't send empty forms, URL regex check
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
    if (!regex.test(form.url)) {
      setError("Please make sure you're using a valid URL");
      setLoading(false);
      setUrlData(null);
      return;
    }
    // post request
    try {
      const result = await fetch("/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (result.ok) {
        const data = await result.json();
        // clear loading and errors, set data
        setUrlData(data);
        setError("");
        setLoading(false);
      } else {
        const err = await result.text();
        throw new Error(err);
      }
    } catch (err: unknown) {
      setUrlData(null);
      setLoading(false);
      // TODO: make this one request to the lambda url directly instead of going thru next to avoid this garbage
      if (err instanceof Error) {
        const parsed = JSON.parse(err.message);
        setError(parsed.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <FormGroup>
          <Label>URL:</Label>
          <TextField
            {...register("url")}
            placeholder="https://www.example.com"
          />
          <Label className={clsx("small")}>
            The given url you want to shorten
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>Short URL Code (optional):</Label>
          <TextField
            {...(register("requestedKey"))}
            placeholder="xYz123"
          />
          <Label className={clsx("small")}>
            Customize your short url code!
          </Label>
          <Label className={clsx("tiny")}>(it might be taken though)</Label>
        </FormGroup>
        <SubmitButton type="submit">Get My URL</SubmitButton>
      </StyledForm>
      <Results>
        {urlData ? (
          <SuccessContainer>
            <div>Success! Your URL is:</div>
            <div>{urlData.url}</div>
          </SuccessContainer>
        ) : null}
        {error ? <ErrorMessage>Error! {error}</ErrorMessage> : null}
        {isLoading ? <Puff height="4em" stroke={`#D36582`} /> : null}
      </Results>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const Label = styled.label`
  font-size: 20px;
  padding-bottom: 8px;
  color: ${({ theme }) => theme.typography.color};
  margin: auto;

  &.small {
    font-size: 16px;
    padding-top: 6px;
  }

  &.tiny {
    font-size: 13px;
    line-height: 4px;
  }
`;

const TextField = styled.input`
  height: 35px;
  font-size: 20px;
  color: ${({ theme }) => theme.typography.color};
  border-radius: 4px;
  border: 2px solid;
  border-color: ${({ theme }) => theme.typography.color};
`;

const SubmitButton = styled.button`
  width: 100px;
  margin: auto;
  margin-top: 20px;
`;

const Results = styled.div`
  margin: 50px;
  text-align: center;
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.palette.rust};
`;
