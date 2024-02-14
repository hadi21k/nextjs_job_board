interface BadgeProps {
  children: React.ReactNode;
}
const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="bg-muted text-muted-foreground rounded border px-2 py-0.5 text-sm font-medium">
      {children}
    </span>
  );
};

export default Badge;
