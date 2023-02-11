import { Loader } from "@mantine/core";

export default function Demo() {
  return (
    <div className="z-50 h-screen flex justify-center items-center  w-screen absolute inset-0">
      <div className="bg-cyan-500 px-7 py-2 rounded">
        <Loader color="white" variant="bars" />
      </div>
    </div>
  );
}
