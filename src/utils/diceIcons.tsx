const Number1 = () => <img src="/dices/number1.png" />;
const Number2 = () => <img src="/dices/number2.png" />;
const Number3 = () => <img src="/dices/number3.png" />;
const Number4 = () => <img src="/dices/number4.png" />;
const Number5 = () => <img src="/dices/number5.png" />;
const Number6 = () => <img src="/dices/number6.png" />;


function getDiceIcon(value: number) {
  if (value === 1) return <Number1 />;
  if (value === 2) return <Number2 />;
  if (value === 3) return <Number3 />;
  if (value === 4) return <Number4 />;
  if (value === 5) return <Number5 />;
  if (value === 6) return <Number6 />;
  return null;
}

export { getDiceIcon };
