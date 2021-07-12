import { StyleSheet } from 'react-native';
import { Palette } from 'App/Theme/Palette';

export default StyleSheet.create({
  styleViewBorder: { backgroundColor: 'transparent' },
  styleTitleBack: { fontSize: 24, fontWeight: '700', color: '#fff' },
  container: { flex: 1, backgroundColor: Palette.color_F5F5F5 },

  viewContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
});
