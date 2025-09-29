import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, Alert } from 'react-native';

const tasbeehat = [
  { 
    id: 1,
    text: "سبحان الله", 
    count: 0, 
    target: 33, 
    color: '#1a5d1a',
    hasanat: 10,
    message: "سبحان الله العظيم"
  },
  { 
    id: 2,
    text: "الحمد لله", 
    count: 0, 
    target: 33, 
    color: '#d4af37',
    hasanat: 10,
    message: "الحمد لله رب العالمين"
  },
  { 
    id: 3,
    text: "الله أكبر", 
    count: 0, 
    target: 34, 
    color: '#8b4513',
    hasanat: 10,
    message: "الله أكبر كبيراً"
  },
  { 
    id: 4,
    text: "لا إله إلا الله", 
    count: 0, 
    target: 1, 
    color: '#2c5530',
    hasanat: 10,
    message: "لا إله إلا الله وحده لا شريك له"
  },
  { 
    id: 5,
    text: "لا حول ولا قوة إلا بالله", 
    count: 0, 
    target: 1, 
    color: '#6b8e23',
    hasanat: 10,
    message: "لا حول ولا قوة إلا بالله العلي العظيم"
  },
  { 
    id: 6,
    text: "أستغفر الله", 
    count: 0, 
    target: 100, 
    color: '#4682b4',
    hasanat: 10,
    message: "أستغفر الله العظيم وأتوب إليه"
  },
  { 
    id: 7,
    text: "اللهم صل على محمد", 
    count: 0, 
    target: 1, 
    color: '#8b008b',
    hasanat: 100, // حسنات أكثر للصلاة على النبي
    message: "اللهم صل على سيدنا محمد وعلى آل محمد"
  },
];

export default function TasbeehScreen({ onBack }) {
  const [counters, setCounters] = useState(tasbeehat);
  const [totalCount, setTotalCount] = useState(0);
  const [totalHasanat, setTotalHasanat] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionHasanat, setSessionHasanat] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const total = counters.reduce((sum, counter) => sum + counter.count, 0);
    const hasanat = counters.reduce((sum, counter) => sum + (counter.count * counter.hasanat), 0);
    setTotalCount(total);
    setTotalHasanat(hasanat);
  }, [counters]);

  const incrementCount = (index) => {
    Vibration.vibrate(50);
    const newCounters = [...counters];
    newCounters[index].count += 1;
    setCounters(newCounters);
    
    // إضافة الحسنات
    const newHasanat = sessionHasanat + newCounters[index].hasanat;
    setSessionHasanat(newHasanat);
    
    // عرض رسالة تسبيح
    if (newCounters[index].count % 10 === 0) {
      Alert.alert(
        "مبارك! 🎉",
        `لقد أتممت ${newCounters[index].count} ${newCounters[index].text}\n\n${newCounters[index].message}`,
        [{ text: "استمر" }]
      );
    }
    
    // احتفال عند إكمال العدد المطلوب
    if (newCounters[index].count === newCounters[index].target) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      Alert.alert(
        "مبروك! 🎊",
        `أتممت ${newCounters[index].target} ${newCounters[index].text}\n\nلقد كسبت ${newCounters[index].target * newCounters[index].hasanat} حسنة!`,
        [{ text: "الحمد لله" }]
      );
    }
  };

  const resetAll = () => {
    Vibration.vibrate(100);
    setCounters(tasbeehat.map(t => ({ ...t, count: 0 })));
    setSessionHasanat(0);
    Alert.alert("تم", "تم إعادة العدادات إلى الصفر");
  };

  const nextTasbeeh = () => {
    setCurrentIndex((prev) => (prev + 1) % counters.length);
  };

  const prevTasbeeh = () => {
    setCurrentIndex((prev) => (prev - 1 + counters.length) % counters.length);
  };

  const completeTasbeeh = () => {
    const completed = counters.filter(t => t.count >= t.target).length;
    const total = counters.length;
    
    if (completed === total) {
      Alert.alert(
        "تهانينا! 🏆",
        `لقد أتممت جميع التسبيحات!\n\nإجمالي الحسنات: ${totalHasanat}`,
        [{ text: "الحمد لله" }]
      );
    } else {
      Alert.alert(
        "التقدم",
        `أتممت ${completed} من ${total} تسبيحة\nالحسنات: ${totalHasanat}`
      );
    }
  };

  const currentTasbeeh = counters[currentIndex];

  return (
    <View style={styles.container}>
      {/* الهيدر */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>🠔 رجوع</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المسبحة الإلكترونية</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* الحسنات */}
      <View style={styles.hasanatContainer}>
        <View style={styles.hasanatCard}>
          <Text style={styles.hasanatTitle}>الحسنات</Text>
          <Text style={styles.hasanatCount}>{totalHasanat}</Text>
          <Text style={styles.hasanatSession}>هذه الجلسة: +{sessionHasanat}</Text>
        </View>
      </View>

      {/* العداد الرئيسي */}
      <View style={styles.mainCounter}>
        <Text style={styles.totalCount}>{totalCount}</Text>
        <Text style={styles.totalLabel}>التسبيحات الكلية</Text>
      </View>

      {showCelebration && (
        <View style={styles.celebration}>
          <Text style={styles.celebrationText}>🎉 لك الجنة ان شاء الله 🎉</Text>
        </View>
      )}

      {/* التسبيحات */}
      <View style={styles.tasbeehContainer}>
        <View style={styles.currentTasbeeh}>
          <Text style={[styles.currentText, { color: currentTasbeeh.color }]}>
            {currentTasbeeh.text}
          </Text>
          <View style={styles.counterContainer}>
            <Text style={styles.currentCount}>{currentTasbeeh.count}</Text>
            <Text style={styles.currentTarget}>/ {currentTasbeeh.target}</Text>
          </View>
          <Text style={styles.hasanatPerClick}>+{currentTasbeeh.hasanat} حسنة/ضغطة</Text>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navButton} onPress={prevTasbeeh}>
            <Text style={styles.navButtonText}>⬅️ السابق</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.countButton, { backgroundColor: currentTasbeeh.color }]}
            onPress={() => incrementCount(currentIndex)}
          >
            <Text style={styles.countButtonText}>اضغط للتسبيح</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={nextTasbeeh}>
            <Text style={styles.navButtonText}>التالي ➡️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* إحصائيات التسبيحات */}
      <View style={styles.statsContainer}>
        <View style={styles.statsHeader}>
          <Text style={styles.statsTitle}>التسبيحات</Text>
          <TouchableOpacity onPress={completeTasbeeh}>
            <Text style={styles.progressButton}>📊 التقدم</Text>
          </TouchableOpacity>
        </View>
        
        {counters.map((tasbeeh, index) => (
          <View key={tasbeeh.id} style={styles.statItem}>
            <View style={[styles.statColor, { backgroundColor: tasbeeh.color }]} />
            <View style={styles.statInfo}>
              <Text style={styles.statText}>{tasbeeh.text}</Text>
              <Text style={styles.statHasanat}>+{tasbeeh.hasanat} حسنة</Text>
            </View>
            <View style={styles.statNumbers}>
              <Text style={styles.statCount}>{tasbeeh.count}</Text>
              <Text style={styles.statTarget}>/ {tasbeeh.target}</Text>
            </View>
            <View style={[
              styles.progressBar,
              { width: `${(tasbeeh.count / tasbeeh.target) * 100}%` }
            ]} />
          </View>
        ))}
      </View>

      {/* زر الإعادة */}
      <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
        <Text style={styles.resetButtonText}>🔄 إعادة الكل</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e7d32',
    padding: 15,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: 60,
  },
  hasanatContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  hasanatCard: {
    backgroundColor: '#ffd700',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  hasanatTitle: {
    fontSize: 18,
    color: '#8b4513',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hasanatCount: {
    fontSize: 36,
    color: '#8b4513',
    fontWeight: 'bold',
  },
  hasanatSession: {
    fontSize: 14,
    color: '#8b4513',
    marginTop: 5,
  },
  mainCounter: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  totalCount: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1a5d1a',
  },
  totalLabel: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  celebration: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,215,0,0.9)',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  celebrationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b4513',
  },
  tasbeehContainer: {
    alignItems: 'center',
    padding: 20,
  },
  currentTasbeeh: {
    alignItems: 'center',
    marginBottom: 30,
  },
  currentText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  currentCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  currentTarget: {
    fontSize: 24,
    color: '#999',
    marginLeft: 5,
  },
  hasanatPerClick: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
  navButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  countButton: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  countButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  statsContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  progressButton: {
    fontSize: 14,
    color: '#1a5d1a',
    fontWeight: '600',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  statColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  statInfo: {
    flex: 1,
  },
  statText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  statHasanat: {
    fontSize: 12,
    color: '#1a5d1a',
    marginTop: 2,
  },
  statNumbers: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statCount: {
    fontSize: 18,
    color: '#1a5d1a',
    fontWeight: 'bold',
  },
  statTarget: {
    fontSize: 14,
    color: '#999',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: '#1a5d1a',
    borderRadius: 2,
  },
  resetButton: {
    backgroundColor: '#ff6b6b',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  resetButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});