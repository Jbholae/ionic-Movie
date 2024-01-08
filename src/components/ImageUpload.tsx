import React, { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  input {
    display: none;
  }
`;

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>, fileSrc: any) => void;
  className?: string;
  value?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUpload: React.FC<Props> = ({
  onChange,
  className,
  value = "",
  setError,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e?.target?.files?.[0] &&
      e?.target?.files?.[0]?.size / 1000 / 1024 >= 2
    ) {
      if (setError) setError("File should not be more than 2 MB");
    } else {
      let fileReader = new FileReader();
      fileReader.onload = (e1) => {
        if (e1.type === "load") {
          onChange(e, fileReader.result);
        }
      };
      if (e.target.files) fileReader.readAsDataURL(e.target.files?.[0]);
    }
  };

  const handleClick = () => {
    ref.current?.click();
  };

  return (
    <Wrapper>
      <div onClick={handleClick} className={className}>
        <input
          type="file"
          onChange={handleChange}
          ref={ref}
          accept="image/*"
          className="neomorphs-shadow-in"
          value={""}
        />
      </div>
    </Wrapper>
  );
};

export { ImageUpload };
