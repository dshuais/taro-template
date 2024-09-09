import { View } from '@tarojs/components';

import './index.scss';

export default function Counter(props: Props) {

  const { value, onChange, minValue = 1, maxValue } = props;

  function handleChange(_value: number) {
    if(_value < minValue) return;
    if(maxValue && _value > maxValue) return;
    onChange && onChange(_value);
  }

  return (
    <View className="Counter-yut223s">
      <View className="Counter-yut223s--icon Counter-yut223s--subtract" onClick={() => handleChange(value - 1)} />
      <View className="Counter-yut223s--value">{value}</View>
      <View className="Counter-yut223s--icon Counter-yut223s--plus" onClick={() => handleChange(value + 1)} />
    </View>
  );
}

type Props = {
  onChange?: (value: number) => void
  value: number
  minValue?: number
  maxValue?: number
}
