import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import hadithData from '../data/hadith.json';

export default function HadithScreen({ onBack }) {
  const [selectedHadith, setSelectedHadith] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openHadith = (hadith) => {
    setSelectedHadith(hadith);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* الهيدر */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>🠔 رجوع</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الأربعين النووية</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* محتوى الأحاديث */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {hadithData.hadiths?.map((hadith) => (
          <TouchableOpacity 
            key={hadith.id} 
            style={styles.hadithCard}
            onPress={() => openHadith(hadith)}
          >
            <View style={styles.hadithNumberContainer}>
              <Text style={styles.hadithNumber}>{hadith.number}</Text>
            </View>
            <View style={styles.hadithContent}>
              <Text style={styles.hadithTitle}>{hadith.title}</Text>
              <Text style={styles.hadithNarrator}>📜 {hadith.narrator}</Text>
              <Text style={styles.hadithSource}>📖 {hadith.source}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal لعرض الحديث كاملاً */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedHadith && (
              <>
                <Text style={styles.modalTitle}>{selectedHadith.title}</Text>
                <Text style={styles.modalNumber}>{selectedHadith.number}</Text>
                
                <ScrollView style={styles.modalScroll}>
                  <Text style={styles.modalArabic}>{selectedHadith.arabic}</Text>
                  
                  <View style={styles.divider} />
                  
                  <Text style={styles.modalSectionTitle}>الشرح:</Text>
                  <Text style={styles.modalExplanation}>{selectedHadith.explanation}</Text>
                  
                  <View style={styles.divider} />
                  
                  <Text style={styles.modalSectionTitle}>الراوي:</Text>
                  <Text style={styles.modalNarrator}>{selectedHadith.narrator}</Text>
                  
                  <Text style={styles.modalSectionTitle}>المصدر:</Text>
                  <Text style={styles.modalSource}>{selectedHadith.source}</Text>
                </ScrollView>

                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>إغلاق</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  content: {
    flex: 1,
    padding: 15,
  },
  hadithCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#8b4513',
  },
  hadithNumberContainer: {
    backgroundColor: '#8b4513',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  hadithNumber: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hadithContent: {
    flex: 1,
  },
  hadithTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  hadithNarrator: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  hadithSource: {
    fontSize: 12,
    color: '#1a5d1a',
    fontStyle: 'italic',
  },
  // ستايلات الـ Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a5d1a',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalNumber: {
    fontSize: 16,
    color: '#8b4513',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  modalScroll: {
    flex: 1,
    marginBottom: 20,
  },
  modalArabic: {
    fontSize: 18,
    color: '#333',
    lineHeight: 30,
    textAlign: 'right',
    marginBottom: 15,
    fontFamily: 'System',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a5d1a',
    marginTop: 10,
    marginBottom: 5,
  },
  modalExplanation: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'right',
  },
  modalNarrator: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'right',
  },
  modalSource: {
    fontSize: 14,
    color: '#1a5d1a',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  closeButton: {
    backgroundColor: '#1a5d1a',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});