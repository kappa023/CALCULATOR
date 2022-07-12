export default function Display(props: { value: string; formula: string }) {
  return (
    <div className="display-wrapper">
      <div className="formula">{props.formula}</div>
      <div className="display">{props.value}</div>
    </div>
  );
}
