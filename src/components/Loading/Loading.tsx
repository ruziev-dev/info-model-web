import { Spinner, Text } from "@blueprintjs/core";

type TLoader = {
  status: string;
};

export const Loader: React.FC<TLoader> = ({ status }) => {
  return (
    <div>
      <Spinner size={50} />
      <Text className="bp3-text-large">{status}</Text>
    </div>
  );
};
