interface Props {
  background: string;
}
export default function Background({ background }: Props) {
  const bg = (background: string) => {
    if (background === "default") return "bg-blue-400";
    if (background === "junior") return "bg-green-400";
    if (background === "midu") return "bg-red-400";
  };

  return (
    <div className={`${bg(background)} absolute w-full h-full -z-10`}></div>
  );
}
