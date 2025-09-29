import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Share, Alert } from 'react-native';

const duaData = [
  {
    id: 1,
    category: "أدعية الصباح",
    icon: "🌅",
    duas: [
      {
        id: 1,
        text: "اللهم إني أصبحت منك في نعمة وعافية وستر، فأتمم نعمتك علي وعافيتك وسترك في الدنيا والآخرة",
        source: "من الأدعية النبوية",
        times: 3,
        hasanat: 100
      },
      {
        id: 2,
        text: "اللهم ما أصبح بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر",
        source: "من الأدعية المأثورة",
        times: 1,
        hasanat: 50
      },
      {
        id: 3,
        text: "اللهم إني أسألك خير هذا اليوم: فتحه ونصره ونوره وبركته وهداه، وأعوذ بك من شر ما فيه وشر ما بعده",
        source: "من الأدعية النبوية",
        times: 1,
        hasanat: 70
      },
      {
        id: 4,
        text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
        source: "الأذكار النووية",
        times: 1,
        hasanat: 100
      }
    ]
  },
  {
    id: 2,
    category: "أدعية المساء",
    icon: "🌇",
    duas: [
      {
        id: 1,
        text: "اللهم إني أمسيت منك في نعمة وعافية وستر، فأتمم نعمتك علي وعافيتك وسترك في الدنيا والآخرة",
        source: "من الأدعية النبوية",
        times: 3,
        hasanat: 100
      },
      {
        id: 2,
        text: "اللهم بما أمسيت بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر",
        source: "من الأدعية المأثورة",
        times: 1,
        hasanat: 50
      },
      {
        id: 3,
        text: "اللهم إني أسألك خير هذه الليلة: فتحها ونصرها ونورها وبركتها وهداها، وأعوذ بك من شر ما فيها وشر ما بعدها",
        source: "من الأدعية النبوية",
        times: 1,
        hasanat: 70
      },
      {
        id: 4,
        text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
        source: "الأذكار النووية",
        times: 1,
        hasanat: 100
      }
    ]
  },
  {
    id: 3,
    category: "أدعية القرآن الكريم",
    icon: "📖",
    duas: [
      {
        id: 1,
        text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        source: "سورة البقرة - الآية 201",
        times: 1,
        hasanat: 100
      },
      {
        id: 2,
        text: "رَبَّنَا لا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا",
        source: "سورة البقرة - الآية 286",
        times: 1,
        hasanat: 100
      },
      {
        id: 3,
        text: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ",
        source: "سورة المؤمنون - الآية 118",
        times: 1,
        hasanat: 80
      },
      {
        id: 4,
        text: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا",
        source: "سورة الإسراء - الآية 80",
        times: 1,
        hasanat: 100
      }
    ]
  },
  {
    id: 4,
    category: "أدعية النبي ﷺ",
    icon: "🕌",
    duas: [
      {
        id: 1,
        text: "اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والجبن والبخل، وغلبة الدين وقهر الرجال",
        source: "رواه البخاري",
        times: 1,
        hasanat: 100
      },
      {
        id: 2,
        text: "اللهم إني أعوذ بك من العجز والكسل، والجبن والهرم، والبخل، وأعوذ بك من عذاب القبر، ومن فتنة المحيا والممات",
        source: "رواه مسلم",
        times: 1,
        hasanat: 100
      },
      {
        id: 3,
        text: "اللهم اهدني فيمن هديت، وعافني فيمن عافيت، وتولني فيمن توليت، وبارك لي فيما أعطيت، وقني شر ما قضيت",
        source: "رواه الترمذي",
        times: 1,
        hasanat: 100
      },
      {
        id: 4,
        text: "اللهم إني أسألك العفو والعافية في الدنيا والآخرة",
        source: "رواه أبو داود",
        times: 1,
        hasanat: 80
      }
    ]
  },
  {
    id: 5,
    category: "أدعية الرزق والمال",
    icon: "💰",
    duas: [
      {
        id: 1,
        text: "اللهم ارزقني رزقاً حلالاً طيباً واسعاً من غير كدٍ، واستجب دعائي من غير رد، وأعوذ بك من الفضيحتين: الفقر والدين",
        source: "من الأدعية المأثورة",
        times: 1,
        hasanat: 70
      },
      {
        id: 2,
        text: "اللهم اكفني بحلالك عن حرامك، وأغنني بفضلك عمن سواك",
        source: "الترمذي",
        times: 1,
        hasanat: 80
      },
      {
        id: 3,
        text: "اللهم إن كان رزقي في السماء فأنزله، وإن كان في الأرض فأخرجه، وإن كان بعيداً فقربه، وإن كان قريباً فيسره",
        source: "من الأدعية المأثورة",
        times: 1,
        hasanat: 70
      }
    ]
  },
  {
    id: 6,
    category: "أدعية الأولاد والزوجة",
    icon: "👨‍👩‍👧‍👦",
    duas: [
      {
        id: 1,
        text: "رب هب لي من لدنك ذرية طيبة إنك سميع الدعاء",
        source: "سورة آل عمران - الآية 38",
        times: 1,
        hasanat: 100
      },
      {
        id: 2,
        text: "رب اجعلني مقيم الصلاة ومن ذريتي ربنا وتقبل دعاء",
        source: "سورة إبراهيم - الآية 40",
        times: 1,
        hasanat: 100
      },
      {
        id: 3,
        text: "اللهم بارك لي في أولادي، واحفظهم من كل سوء، وارزقني برهم في حياتي وبعد مماتي",
        source: "من الأدعية المأثورة",
        times: 1,
        hasanat: 70
      }
    ]
  },
  {
    id: 7,
    category: "أدعية الشفاء",
    icon: "🏥",
    duas: [
      {
        id: 1,
        text: "أعوذ بكلمات الله التامات من شر ما خلق",
        source: "رواه مسلم",
        times: 3,
        hasanat: 100
      },
      {
        id: 2,
        text: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم",
        source: "رواه أبو داود",
        times: 3,
        hasanat: 100
      },
      {
        id: 3,
        text: "اللهم رب الناس، أذهب البأس، اشف وأنت الشافي، لا شفاء إلا شفاؤك، شفاء لا يغادر سقماً",
        source: "رواه البخاري",
        times: 7,
        hasanat: 150
      }
    ]
  },
  {
    id: 8,
    category: "أدعية السفر",
    icon: "✈️",
    duas: [
      {
        id: 1,
        text: "سبحان الذي سخر لنا هذا وما كنا له مقرنين، وإنا إلى ربنا لمنقلبون",
        source: "سورة الزخرف - الآية 13",
        times: 1,
        hasanat: 100
      },
      {
        id: 2,
        text: "اللهم هون علينا سفرنا هذا، واطو عنا بعده، اللهم أنت الصاحب في السفر، والخليفة في الأهل",
        source: "رواه مسلم",
        times: 1,
        hasanat: 100
      },
      {
        id: 3,
        text: "آللهم إني أعوذ بك من وعثاء السفر، وكآبة المنظر، وسوء المنقلب في المال والأهل",
        source: "رواه مسلم",
        times: 1,
        hasanat: 100
      }
    ]
  },
  {
    id: 9,
    category: "أدعية الكرب والهم",
    icon: "😔",
    duas: [
      {
        id: 1,
        text: "لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم، لا إله إلا الله رب السماوات ورب الأرض ورب العرش الكريم",
        source: "رواه البخاري",
        times: 1,
        hasanat: 100
      },
      {
        id: 2,
        text: "اللهم إني عبدك وابن عبدك وابن أمتك، ناصيتي بيدك، ماض في حكمك، عدل في قضاؤك",
        source: "رواه أحمد",
        times: 1,
        hasanat: 150
      },
      {
        id: 3,
        text: "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم",
        source: "سورة التوبة - الآية 129",
        times: 7,
        hasanat: 200
      }
    ]
  },
  {
    id: 10,
    category: "أدعية عامة",
    icon: "🙏",
    duas: [
      {
        id: 1,
        text: "رب اغفر وارحم وأنت خير الراحمين",
        source: "سورة المؤمنون - الآية 118",
        times: 1,
        hasanat: 80
      },
      {
        id: 2,
        text: "لا إله إلا أنت سبحانك إني كنت من الظالمين",
        source: "سورة الأنبياء - الآية 87",
        times: 1,
        hasanat: 100
      },
      {
        id: 3,
        text: "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم",
        source: "سورة التوبة - الآية 129",
        times: 7,
        hasanat: 200
      },
      {
        id: 4,
        text: "لا حول ولا قوة إلا بالله العلي العظيم",
        source: "من الأدعية المأثورة",
        times: 100,
        hasanat: 500
      }
    ]
  }
];

export default function DuaScreen({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDua, setSelectedDua] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState([]);

  const openDua = (dua) => {
    setSelectedDua(dua);
    setModalVisible(true);
  };

  const shareDua = async (dua) => {
    try {
      await Share.share({
        message: `${dua.text}\n\n${dua.source}`,
      });
    } catch (error) {
      Alert.alert('عذراً', 'لا يمكن مشاركة هذا الدعاء');
    }
  };

  const toggleFavorite = (duaId) => {
    if (favorites.includes(duaId)) {
      setFavorites(favorites.filter(id => id !== duaId));
      Alert.alert('تم', 'تم إزالة الدعاء من المفضلة');
    } else {
      setFavorites([...favorites, duaId]);
      Alert.alert('تم', 'تم إضافة الدعاء إلى المفضلة');
    }
  };

  const filteredCategories = duaData.filter(category => 
    category.duas.some(dua => 
      dua.text.includes(searchText) || 
      category.category.includes(searchText)
    )
  );

  return (
    <View style={styles.container}>
      {/* الهيدر */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>🠔 رجوع</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الأدعية</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* شريط البحث */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchInput}>
          {searchText || 'ابحث في الأدعية...'}
        </Text>
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* التبويبات */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {filteredCategories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === index && styles.activeCategoryTab
            ]}
            onPress={() => setSelectedCategory(index)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryText,
              selectedCategory === index && styles.activeCategoryText
            ]}>
              {category.category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* محتوى الأدعية */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredCategories[selectedCategory]?.duas.map((dua) => (
          <TouchableOpacity 
            key={dua.id} 
            style={styles.duaCard}
            onPress={() => openDua(dua)}
          >
            <View style={styles.duaHeader}>
              <View style={styles.duaInfo}>
                <Text style={styles.duaSource}>{dua.source}</Text>
                <View style={styles.duaStats}>
                  <Text style={styles.duaTimes}>🕒 {dua.times} مرة</Text>
                  <Text style={styles.duaHasanat}>⭐ {dua.hasanat} حسنة</Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => toggleFavorite(dua.id)}
                style={styles.favoriteButton}
              >
                <Text style={[
                  styles.favoriteIcon,
                  favorites.includes(dua.id) && styles.favorited
                ]}>
                  {favorites.includes(dua.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.duaText} numberOfLines={3}>{dua.text}</Text>
            <View style={styles.duaActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => openDua(dua)}
              >
                <Text style={styles.actionText}>📖 قراءة كاملة</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => shareDua(dua)}
              >
                <Text style={styles.actionText}>↗️ مشاركة</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal لعرض الدعاء كاملاً */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedDua && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>الدعاء</Text>
                  <TouchableOpacity 
                    onPress={() => setModalVisible(false)}
                    style={styles.closeModalButton}
                  >
                    <Text style={styles.closeModalText}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.modalScroll}>
                  <View style={styles.modalDuaCard}>
                    <Text style={styles.modalDuaText}>{selectedDua.text}</Text>
                    
                    <View style={styles.modalDivider} />
                    
                    <View style={styles.modalInfo}>
                      <Text style={styles.modalSource}>📚 {selectedDua.source}</Text>
                      <View style={styles.modalStats}>
                        <Text style={styles.modalStat}>عدد المرات: {selectedDua.times}</Text>
                        <Text style={styles.modalStat}>الحسنات: {selectedDua.hasanat}</Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.modalActionButton}
                    onPress={() => shareDua(selectedDua)}
                  >
                    <Text style={styles.modalActionText}>↗️ مشاركة</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.modalActionButton}
                    onPress={() => {
                      toggleFavorite(selectedDua.id);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalActionText}>
                      {favorites.includes(selectedDua.id) ? '❤️ إزالة المفضلة' : '🤍 إضافة للمفضلة'}
                    </Text>
                  </TouchableOpacity>
                </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    color: '#666',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  clearSearch: {
    fontSize: 18,
    color: '#666',
    padding: 5,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriesContent: {
    paddingHorizontal: 15,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  activeCategoryTab: {
    backgroundColor: '#218b13ff',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  duaCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  duaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  duaInfo: {
    flex: 1,
  },
  duaSource: {
    fontSize: 14,
    color: '#8b4513',
    fontWeight: '600',
    marginBottom: 5,
  },
  duaStats: {
    flexDirection: 'row',
  },
  duaTimes: {
    fontSize: 12,
    color: '#666',
    marginRight: 15,
  },
  duaHasanat: {
    fontSize: 12,
    color: '#d4af37',
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 5,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  favorited: {
    color: '#ff6b6b',
  },
  duaText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: 15,
  },
  duaActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
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
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8b4513',
  },
  closeModalButton: {
    padding: 5,
  },
  closeModalText: {
    fontSize: 20,
    color: '#666',
  },
  modalScroll: {
    padding: 20,
  },
  modalDuaCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
  },
  modalDuaText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 30,
    textAlign: 'right',
    marginBottom: 20,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  modalInfo: {
    marginTop: 10,
  },
  modalSource: {
    fontSize: 16,
    color: '#8b4513',
    fontWeight: '600',
    marginBottom: 10,
  },
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalStat: {
    fontSize: 14,
    color: '#666',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalActionButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#27a105ff',
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalActionText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
});