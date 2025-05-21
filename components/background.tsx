interface Props {
  background: string;
}
export default function Background({ background }: Props) {
  const bg =
    {
      default: "#f7df1e",
      junior: "#f7df1e",
      midu: "#ff000c",
    }[background] || "#f7df1e";

  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full bg-white"
      style={{
        background: `radial-gradient(125% 125% at 50% 10%, #fff 40%, ${bg} 100%)`,
      }}
    ></div>
  );
}
