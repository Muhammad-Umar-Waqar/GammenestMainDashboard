import Welcome from "@/components/Welcome";
import Image from "next/image";

const unique_id = "2256-227-567-1";

export default function Home() {
  return (
   <main>
    <Welcome unique_id={unique_id}/>
    {/* <Image src="/MobLogo.svg" height={70} width={212}/> */}

   </main>
  );
}
