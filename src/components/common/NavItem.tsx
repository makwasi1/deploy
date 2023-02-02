import Typography from "@mui/material/Typography";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const NavItem: React.FC<PropsWithChildren & { href: string }> = ({ children, href }) => {
  const { pathname } = useRouter();
  const active = href === pathname;

  return (
    <Typography
      color={active ? "text.primary" : "text.secondary"}
      component={Link}
      variant="h6"
      href={href}
      sx={{
        "&:hover": { color: "text.primary" },
        cursor: "pointer",
        position: "relative",
        transition: "all 0.3s ease",
        "&::after": {
          content: '""',
          width: 1,
          display: active ? "block" : "none",
          height: 12,
          bgcolor: "accent.main",
          transition: "all 0.3s ease",
          position: "absolute",
          bottom: 2,
          left: -5,
          opacity: 0.5,
          zIndex: "-1",
        },
      }}
    >
      {children}
    </Typography>
  );
};
