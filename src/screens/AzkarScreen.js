import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import azkarData from '../data/azkar.json';

export default function AzkarScreen({ onBack }) {
  const [selectedTime, setSelectedTime] = useState('morning');

  return (
    <View style={styles.container}>
      {/* الهيدر */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>🠔 رجوع</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الأذكار</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* التبويبات */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTime === 'morning' && styles.activeTab]}
          onPress={() => setSelectedTime('morning')}
        >
          <Text style={[styles.tabText, selectedTime === 'morning' && styles.activeTabText]}>
            🌅 أذكار الصباح
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTime === 'evening' && styles.activeTab]}
          onPress={() => setSelectedTime('evening')}
        >
          <Text style={[styles.tabText, selectedTime === 'evening' && styles.activeTabText]}>
            🌇 أذكار المساء
          </Text>
        </TouchableOpacity>
      </View>

      {/* محتوى الأذكار */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {azkarData[selectedTime]?.map((zekr) => (
          <View key={zekr.id} style={styles.zekrCard}>
            <View style={styles.zekrHeader}>
              <Text style={styles.zekrCategory}>{zekr.category}</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{zekr.count}x</Text>
              </View>
            </View>
            <Text style={styles.zekrText}>{zekr.text}</Text>
          </View>
        ))}
      </ScrollView>
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
    backgroundColor: '#138b1bff',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#1a5d1a',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  zekrCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  zekrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  zekrCategory: {
    fontSize: 14,
    color: '#1a5d1a',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  countBadge: {
    backgroundColor: '#1a5d1a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  zekrText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
    textAlign: 'right',
  },
});