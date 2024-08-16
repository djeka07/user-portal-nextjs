
import { redirect } from "next/navigation";

type IndexProps = {
  params: { lng: string }
}

const Index = ({ params: { lng } }: IndexProps) => {
  redirect(`/${lng}/login`)
}

export default Index