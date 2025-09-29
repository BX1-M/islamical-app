import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Animated, Alert, Easing, Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';
import { LogBox } from 'react-native';

// تجاهل تحذيرات معينة
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
// استيراد الشاشات
import HomeScreen from './src/screens/HomeScreen';
import AzkarScreen from './src/screens/AzkarScreen';
import HadithScreen from './src/screens/HadithScreen';
import DuaScreen from './src/screens/DuaScreen';
import TasbeehScreen from './src/screens/TasbeehScreen';

const { width, height } = Dimensions.get('window');

// بيانات الأدعية للإشعارات
const adyaa = [
  "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً",
  "اللهم اغفر لي وارحمني واهدني وارزقني وعافني",
  "اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل",
  "رب اغفر وارحم وأنت خير الراحمين",
  "لا إله إلا أنت سبحانك إني كنت من الظالمين",
  "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم",
  "اللهم صل على محمد وعلى آل محمد كما صليت على إبراهيم وعلى آل إبراهيم",
  "سبحان الله وبحمده، سبحان الله العظيم",
  "لا حول ولا قوة إلا بالله العلي العظيم",
  "اللهم إني أسألك الجنة وأعوذ بك من النار"
];

// الألوان المتناسقة
const COLORS = {
  primary: '#1a5d1a',      // أخضر إسلامي غامق
  secondary: '#2e7d32',    // أخضر متوسط
  accent: '#d4af37',       // ذهبي
  light: '#4caf50',        // أخضر فاتح
  background: '#0d3d0d',   // أخضر داكن للخلفية
  text: '#ffffff',         // أبيض
  textSecondary: '#e8f5e8', // أبيض مائل للأخضر الفاتح
  goldLight: '#ffd700',    // ذهبي فاتح
  goldDark: '#b8860b',     // ذهبي غامق
};

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');
  
  // الأنيميشنات للشاشة الرئيسية فقط
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  // طلب صلاحيات الإشعارات
//  useEffect(() => {
//   (async () => {
//     try {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status === 'granted') {
//         console.log('Notification permissions granted');
        
//         // تأخير بدء الإشعارات لضمان استقرار التطبيق
//         setTimeout(() => {
//           setInterval(async () => {
//             const randomDua = adyaa[Math.floor(Math.random() * adyaa.length)];
//             try {
//               await Notifications.scheduleNotificationAsync({
//                 content: {
//                   title: 'دعاء 📿',
//                   body: randomDua,
//                   sound: true,
//                 },
//                 trigger: {
//                   seconds: 3600, // كل ساعة بدلاً من كل دقيقة
//                 },
//               });
//             } catch (error) {
//               console.log('Error scheduling notification:', error);
//             }
//           }, 3600000); // كل ساعة
//         }, 10000); // تأخير 10 ثواني
//       }
//     } catch (error) {
//       console.log('Error requesting notification permissions:', error);
//     }
//   })();
// }, []);

  const openWhatsApp = () => {
    const url = 'https://wa.me/967770173154';
    Linking.openURL(url).catch(err => {
      Alert.alert('خطأ', 'لا يمكن فتح الواتساب');
    });
  };

  const goBack = () => {
    setCurrentScreen('home');
  };

  const handleEnter = () => {
    setShowWelcome(false);
  };

  // أنيميشن الدخول للشاشة الرئيسية
  useEffect(() => {
    if (!showWelcome && currentScreen === 'home') {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 20,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [showWelcome, currentScreen]);

  // شاشة البداية
  if (showWelcome) {
    return <WelcomeScreen onEnter={handleEnter} />;
  }

  // عرض الشاشات المختلفة
  const renderScreen = () => {
    switch (currentScreen) {
      case 'azkar':
        return <AzkarScreen onBack={goBack} />;
      case 'hadith':
        return <HadithScreen onBack={goBack} />;
      case 'dua':
        return <DuaScreen onBack={goBack} />;
      case 'tasbeeh':
        return <TasbeehScreen onBack={goBack} />;
      default:
        return (
          <Animated.View style={[styles.homeContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <HomeScreen 
              onNavigate={setCurrentScreen}
              onWhatsApp={openWhatsApp}
            />
          </Animated.View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

// مكون شاشة الترحيب المنفصل
function WelcomeScreen({ onEnter }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(300));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [textGlowAnim] = useState(new Animated.Value(0));
  const [starsAnim] = useState(new Animated.Value(0));
  const [countdown, setCountdown] = useState(10);

  // أنيميشن الدخول التلقائي بعد 10 ثواني
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onEnter();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // تشغيل جميع الأنيميشنات
  useEffect(() => {
    // أنيميشن التلاشي
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // أنيميشن الانزلاق
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1200,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    }).start();

    // أنيميشن الدوران
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // أنيميشن النبض
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // أنيميشن توهج النص
    Animated.loop(
      Animated.sequence([
        Animated.timing(textGlowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textGlowAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // أنيميشن النجوم
    Animated.loop(
      Animated.sequence([
        Animated.timing(starsAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(starsAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleManualEnter = () => {
    onEnter();
  };

  // تحويل الدوران
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // توهج النص
  const textGlowInterpolate = textGlowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,1)'],
  });

  // توهج النجوم
  const starsInterpolate = starsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.4)'],
  });

  return (
    <View style={styles.welcomeContainer}>
      {/* خلفية متدرجة */}
      <View style={styles.gradientBackground} />

      {/* النجوم المتلألئة */}
      <Animated.View style={[styles.stars, { opacity: starsInterpolate }]} />
      
      {/* خلفية متحركة */}
      <View style={styles.backgroundAnimation}>
        <Animated.View style={[styles.floatingCircle, styles.circle1, { transform: [{ scale: pulseAnim }] }]} />
        <Animated.View style={[styles.floatingCircle, styles.circle2, { transform: [{ rotate: rotateInterpolate }] }]} />
        <Animated.View style={[styles.floatingCircle, styles.circle3, { transform: [{ scale: pulseAnim }] }]} />
        <Animated.View style={[styles.floatingCircle, styles.circle4, { transform: [{ rotate: rotateInterpolate }] }]} />
      </View>

      {/* الشعار الرئيسي */}
      <Animated.View 
        style={[
          styles.logoContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        <Animated.View style={[styles.mosqueIcon, { transform: [{ rotate: rotateInterpolate }] }]}>
          <Text style={styles.mosqueEmoji}>🕌</Text>
        </Animated.View>
        <Text style={styles.appName}>تطبيقي الإسلامي</Text>
        <Text style={styles.appSubtitle}>بَرْمَجَة: مُرْتَضَى أَمِين عَفِيفِي</Text>
        
        {/* زخارف إسلامية */}
        <View style={styles.islamicPattern}>
          <Text style={styles.patternText}>﷽</Text>
        </View>
      </Animated.View>

      {/* النص الرئيسي */}
      <Animated.View 
        style={[
          styles.textContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        <View style={styles.textBackground}>
          <Animated.Text style={[styles.welcomeTitle, { color: textGlowInterpolate }]}>
            اللَّهُمَّ اغْفِرْ لِمَنْ بَرْمَجَ
          </Animated.Text>
          <Animated.Text style={[styles.welcomeTitle, { color: textGlowInterpolate }]}>
            وَصَنَعَ وَسَاهَمَ فِي هَذَا التَّطْبِيقِ
          </Animated.Text>
          <Animated.Text style={[styles.welcomeTitle, { color: textGlowInterpolate }]}>
            وَلِوَالِدَيْهِ وَلِجَمِيعِ الْمُسْلِمِينَ
          </Animated.Text>
        </View>
      </Animated.View>
     

      {/* أزرار الدخول */}
      <Animated.View 
        style={[
          styles.buttonsContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            style={styles.enterButton}
            onPress={handleManualEnter}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.enterButtonIcon}>🚪</Text>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.enterButtonText}>ادْخُلِ الْآن</Text>
                <Text style={styles.enterButtonSubtext}>اضغط للدخول الفوري</Text>
              </View>
            </View>
            <View style={styles.buttonGlow} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* التذييل */}
      <Animated.View 
        style={[
          styles.footer,
          { opacity: fadeAnim }
        ]}
      >
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          <Text style={styles.footerVerse}>"رَبِّ زدْني عِلْماً"</Text>
          <Text style={styles.footerReference}>[ طه: 114 ]</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.background,
  },
  stars: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  backgroundAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.15,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.goldLight,
    top: '10%',
    left: '10%',
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.accent,
    top: '60%',
    right: '15%',
  },
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.light,
    bottom: '20%',
    left: '20%',
  },
  circle4: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.goldDark,
    top: '30%',
    right: '25%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.08,
    zIndex: 2,
  },
  mosqueIcon: {
    marginBottom: 20,
  },
  mosqueEmoji: {
    fontSize: 80,
    textShadowColor: 'rgba(212, 175, 55, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  appName: {
    fontSize: 32,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 14,
    color: COLORS.accent,
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  islamicPattern: {
    marginTop: 15,
  },
  patternText: {
    fontSize: 24,
    color: COLORS.accent,
    opacity: 0.6,
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },
  textBackground: {
    backgroundColor: 'rgba(26, 93, 26, 0.3)',
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    lineHeight: 30,
    letterSpacing: 0.5,
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 2,
  },
  countdownCard: {
    backgroundColor: 'rgba(26, 93, 26, 0.4)',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    minWidth: 250,
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 10,
    fontWeight: '500',
  },
  countdownNumber: {
    fontSize: 16,
    color: COLORS.goldLight,
    fontWeight: 'bold',
  },
  countdownBar: {
    width: 200,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  countdownProgress: {
    height: '100%',
    backgroundColor: COLORS.goldLight,
    borderRadius: 3,
    shadowColor: COLORS.goldLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonsContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.05,
    zIndex: 2,
  },
  enterButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 2,
    borderColor: COLORS.accent,
    minWidth: 250,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterButtonIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  buttonTextContainer: {
    alignItems: 'center',
  },
  enterButtonText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  enterButtonSubtext: {
    fontSize: 11,
    color: COLORS.textSecondary,
    opacity: 0.9,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.accent,
    opacity: 0.1,
    borderRadius: 25,
  },
  skipButton: {
    padding: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    zIndex: 2,
  },
  footerContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(26, 93, 26, 0.3)',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  footerText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
    fontFamily: 'System',
    fontWeight: '500',
  },
  footerVerse: {
    fontSize: 14,
    color: COLORS.accent,
    fontStyle: 'italic',
    marginBottom: 3,
  },
  footerReference: {
    fontSize: 12,
    color: COLORS.textSecondary,
    opacity: 0.8,
  },
  homeContainer: {
    flex: 1,
  },
});