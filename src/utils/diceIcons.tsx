import Image from 'next/image'

const Number1 = () => <Image src="/dices/number1.png" alt='dice number 1' width={80} height={67}/>;
const Number2 = () => <Image src="/dices/number2.png" alt='dice number 2' width={80} height={67}/>;
const Number3 = () => <Image src="/dices/number3.png" alt='dice number 3' width={80} height={67}/>;
const Number4 = () => <Image src="/dices/number4.png" alt='dice number 4' width={80} height={67}/>;
const Number5 = () => <Image src="/dices/number5.png" alt='dice number 5' width={80} height={67}/>;
const Number6 = () => <Image src="/dices/number6.png" alt='dice number 6' width={80} height={67}/>;


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
