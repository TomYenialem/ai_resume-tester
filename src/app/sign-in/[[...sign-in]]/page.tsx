import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div  className="absolute  left-1.5 top-1.5">
        <SignIn />;
    </div>
   
  )
  
}
