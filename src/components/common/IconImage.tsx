import Stack from "@mui/material/Stack";
import Image from "next/image";
import React from "react";

export const IconImage: React.FC<{ width?: number; height?: number; image: any }> = ({
  height = 40,
  width = 40,
  image,
}) => {
  return (
    <Stack sx={{ cursor: "pointer" }}>
      <Image alt="Icon" src={image} width={width} height={height} />
    </Stack>
  );
};
