import { cn } from "@/lib/utils";

export default function Heading({
  title,
  subtitle,
  titleCn,
}: {
  title: string;
  subtitle: string;
  titleCn?: string;
}) {
  return (
    <div
      data-aos="fade-right"
      className="mb-6 space-y-2"
    >
      <h1
        className={cn(
          "text-primary",
          titleCn,
        )}
      >
        {title}
      </h1>
      <h2 className="text-xl font-semibold">
        {subtitle}
      </h2>
    </div>
  );
}
