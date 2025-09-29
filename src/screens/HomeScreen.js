import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// الألوان المتناسقة مع التطبيق
const COLORS = {
  primary: '#1a5d1a',
  secondary: '#2e7d32',
  accent: '#d4af37',
  light: '#4caf50',
  background: '#f8f9fa',
  text: '#2d3748',
  textSecondary: '#4a5568',
  goldLight: '#ffd700',
  goldDark: '#b8860b',
  white: '#ffffff',
};

export default function HomeScreen({ onNavigate, onWhatsApp }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // أنيميشن الدخول
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        useNativeDriver: true,
      })
    ]).start();

    // أنيميشن النبض المستمر
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* خلفية زخرفية */}
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
      </View>

      {/* الهيدر */}
      <Animated.View 
        style={[
          styles.header,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🕌 زاد المسلم 🕌</Text>
          <View style={styles.titleUnderline} />
        </View>
        <Text style={styles.subtitle}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        <Text style={styles.welcomeText}>مرحباً بك في تطبيقك الإسلامي</Text>
      </Animated.View>
      
      {/* القائمة الرئيسية */}
      <Animated.View 
        style={[
          styles.menu,
          { 
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ] 
          }
        ]}
      >
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            style={[styles.menuItem, styles.hadithItem]}
            onPress={() => onNavigate('hadith')}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>📖</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>الأربعين النووية</Text>
              <Text style={styles.menuSubtext}>40 حديثاً نبوياً شريفاً</Text>
            </View>
            <View style={styles.menuArrow}>
              <Text style={styles.arrowIcon}>➡️</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            style={[styles.menuItem, styles.azkarItem]}
            onPress={() => onNavigate('azkar')}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>📿</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>أذكار الصباح والمساء</Text>
              <Text style={styles.menuSubtext}>أذكار اليوم والليلة</Text>
            </View>
            <View style={styles.menuArrow}>
              <Text style={styles.arrowIcon}>➡️</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            style={[styles.menuItem, styles.duaItem]}
            onPress={() => onNavigate('dua')}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🕋</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>الأدعية المأثورة</Text>
              <Text style={styles.menuSubtext}>مجموعة مختارة من الأدعية</Text>
            </View>
            <View style={styles.menuArrow}>
              <Text style={styles.arrowIcon}>➡️</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            style={[styles.menuItem, styles.tasbeehItem]}
            onPress={() => onNavigate('tasbeeh')}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>☪️</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>المسبحة الإلكترونية</Text>
              <Text style={styles.menuSubtext}>عداد التسبيح الذكي</Text>
            </View>
            <View style={styles.menuArrow}>
              <Text style={styles.arrowIcon}>➡️</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* الفوتر */}
      <Animated.View 
        style={[
          styles.footer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        {/* معلومات المبرمج */}
        <View style={styles.creatorSection}>
          <Text style={styles.creatorLabel}>بَرْمَجَةُ الْتَطْبِيقِ</Text>
          <Text style={styles.creatorName}>مُرْتَضَى أَمِين عَفِيفِي</Text>
        </View>

        {/* زر الواتساب مع الصورة فقط */}
<TouchableOpacity 
  style={styles.whatsappButton} 
  onPress={onWhatsApp}
  activeOpacity={0.8}
>
  <Image 
    source={require('../../assets/images/WhatsApp.png')} // المسار الصحيح
    style={styles.whatsappIcon}
    resizeMode="contain"
  />
  <View style={styles.buttonGlow} />
</TouchableOpacity>
        {/* آية قرآنية */}
        <View style={styles.verseSection}>
          <Text style={styles.verseText}>"رَبِّ زدْني عِلْماً"</Text>
          <Text style={styles.verseReference}>[ طه: 114 ]</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(26, 93, 26, 0.03)',
    top: '10%',
    left: '-10%',
  },
  patternCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(212, 175, 55, 0.03)',
    bottom: '20%',
    right: '-5%',
  },
  patternCircle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(46, 125, 50, 0.03)',
    top: '50%',
    left: '80%',
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.04,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    textShadowColor: 'rgba(26, 93, 26, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 0.5,
  },
  titleUnderline: {
    width: 120,
    height: 4,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    opacity: 0.8,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItem: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: COLORS.primary,
    borderRightColor: 'rgba(0,0,0,0.05)',
    borderTopColor: 'rgba(0,0,0,0.05)',
    borderBottomColor: 'rgba(0,0,0,0.05)',
    transform: [{ scale: 1 }],
  },
  hadithItem: {
    borderLeftColor: COLORS.primary,
  },
  azkarItem: {
    borderLeftColor: COLORS.accent,
  },
  duaItem: {
    borderLeftColor: '#8b4513',
  },
  tasbeehItem: {
    borderLeftColor: COLORS.secondary,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(26, 93, 26, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuContent: {
    flex: 1,
  },
  menuText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  menuSubtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
    opacity: 0.8,
    fontWeight: '500',
  },
  menuArrow: {
    paddingLeft: 10,
  },
  arrowIcon: {
    fontSize: 16,
    opacity: 0.6,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  creatorSection: {
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(26, 93, 26, 0.05)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    width: '100%',
  },
  creatorLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  creatorName: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 15,
  },
  whatsappIcon: {
    width: 30,
    height: 30,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
  },
  verseSection: {
    alignItems: 'center',
    backgroundColor: 'rgba(26, 93, 26, 0.05)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
    width: '100%',
  },
  verseText: {
    fontSize: 14,
    color: COLORS.primary,
    fontStyle: 'italic',
    fontWeight: '500',
    marginBottom: 2,
  },
  verseReference: {
    fontSize: 11,
    color: COLORS.textSecondary,
    opacity: 0.7,
  },
});