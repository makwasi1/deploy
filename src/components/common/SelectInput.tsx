import { InputBase, Stack, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/system";

interface Data {
  id: string;
  label: string;
  value: string;
}

interface Props {
  placeholder: string;
  label?: string;
  name: string;
  value?: string;
  disabled?: boolean;
  handleChange?(event: { target: { value: string; name: string } } | string | null): void;
  data: Data[];
}

const CustomBaseInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    py: 0.5,
    borderRadius: theme.spacing(0.8),
    width: "100%",
    padding: theme.spacing(1.1, 2),
    border: `1px solid ${theme.palette.accent.main}`,
    color: theme.palette.accent.main,
    "&:hover": {
      borderRadius: theme.spacing(0.8),
      border: `1px solid ${theme.palette.accent.main}`,
    },
  },
}));

export function SelectInput({ name, placeholder, value, label, data, disabled = false, handleChange }: Props) {
  return (
    <Stack sx={{ width: 1, position: "relative" }} spacing={1}>
      <Typography color="accent.main">{label}</Typography>
      <FormControl variant="filled" sx={{ width: 1 }} disabled={disabled}>
        <Select
          sx={{ py: 0, border: "none" }}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value}
          name={name}
          displayEmpty
          input={<CustomBaseInput />}
          onChange={handleChange}
        >
          <MenuItem value="">
            <Typography color="text.secondary">{placeholder}</Typography>
          </MenuItem>
          {data?.map((el) => (
            <MenuItem value={el.value} key={el.id}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
