import LightIcon from "@/assets/icons/light.png";
import Image from "next/image";

export function LightModeIcon() {
  return <Image src={LightIcon} width={24} height={24} alt="light mode" />;
}
