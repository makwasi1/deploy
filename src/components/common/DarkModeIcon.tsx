import DakIcon from "@/assets/icons/dark.png";
import Image from "next/image";

export function DarkModeIcon() {
  return <Image src={DakIcon} width={24} height={24} style={{ filter: "invert(1)" }} alt="dark mode" />;
}
