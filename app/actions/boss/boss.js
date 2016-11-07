
import { Clipboard } from 'react-native';

export function copyID(id) {
  Clipboard.setString(id);
}
