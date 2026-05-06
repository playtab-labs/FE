import { Text } from "react-native";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Text> & { text: string };

export default function ColoredText({ text, ...props }: Props) {
  const parts = text.split(/\[\[|\]\]/);
  return (
    <Text {...props}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={{ color: "#FF7654" }}>
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
}
