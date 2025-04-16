import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';


const { width } = Dimensions.get('window');

export default function RoadmapScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [scaleValue] = useState(new Animated.Value(1));

  const roadmapData = {
    title: "UI/UX Design Fundamentals",
    duration: "3 months",
    chapters: 7,
    items: [
      { id: 1, title: "Introduction to UI/UX Design" },
      { id: 2, title: "User Research Methods" },
      { id: 3, title: "Wireframing & Prototyping" },
      { id: 4, title: "Visual Design Principles" },
      { id: 5, title: "Interaction Design" },
      { id: 6, title: "Usability Testing" },
      { id: 7, title: "Portfolio Projects" },
    ]
  };

  const resetProgress = async () => {
    try {
      await AsyncStorage.removeItem('uiux-progress');
      setProgress(0);
    } catch (error) {
      console.error('Failed to reset progress:', error);
    }
  };

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const saved = await AsyncStorage.getItem('uiux-progress');
        if (saved !== null) {
          setProgress(parseInt(saved, 10));
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    };

    loadProgress();
  }, []);

  const handleLessonPress = async (index: number) => {
    if (index > progress) return;

    // Button press animation
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      })
    ]).start();

    if (index === progress) {
      const nextProgress = progress + 1;
      setProgress(nextProgress);
      try {
        await AsyncStorage.setItem('uiux-progress', nextProgress.toString());
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    }

    router.push('/lesson-complete');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>  
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#4A5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Path</Text>
        <TouchableOpacity 
          onPress={resetProgress}
          style={styles.resetButton}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh" size={20} color="#4C51BF" />
        </TouchableOpacity>
      </View>
      
      
      {/* Course Header */}
      <View style={styles.courseHeader}>
        <Text style={styles.courseTitle}>{roadmapData.title}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(progress / roadmapData.items.length) * 100}%` }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {progress} of {roadmapData.items.length} lessons completed
          </Text>
        </View>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#718096" />
            <Text style={styles.metaText}>{roadmapData.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="layers-outline" size={16} color="#718096" />
            <Text style={styles.metaText}>{roadmapData.chapters} chapters</Text>
          </View>
        </View>
      </View>

      {/* Chapters List */}
      <View style={styles.chaptersContainer}>
        {roadmapData.items.map((item, index) => {
          const isCompleted = index < progress;
          const isCurrent = index === progress;
          const isLocked = index > progress;

          return (
            <Animated.View 
              key={item.id} 
              style={{ transform: [{ scale: scaleValue }] }}
            >
              <TouchableOpacity
                style={[
                  styles.chapterItem,
                  isCurrent && styles.currentChapter,
                  isLocked && styles.lockedChapter
                ]}
                disabled={isLocked}
                onPress={() => handleLessonPress(index)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.chapterIcon,
                  isCompleted && styles.completedIcon,
                  isCurrent && styles.currentIcon,
                  isLocked && styles.lockedIcon
                ]}>
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  ) : isLocked ? (
                    <Ionicons name="lock-closed" size={16} color="#A0AEC0" />
                  ) : (
                    <Text style={[
                      styles.chapterNumber,
                      isCurrent && { color: '#4C51BF' }
                    ]}>
                      {index + 1}
                    </Text>
                  )}
                </View>
                <View style={styles.chapterContent}>
                  <Text style={[
                    styles.chapterTitle,
                    isCompleted && { color: '#4A5568' },
                    isCurrent && { color: '#2D3748', fontWeight: '600' },
                    isLocked && { color: '#A0AEC0' }
                  ]}>
                    {item.title}
                  </Text>
                  {!isLocked && (
                    <Text style={styles.chapterStatus}>
                      {isCompleted ? 'Completed' : isCurrent ? 'Next Lesson' : ''}
                    </Text>
                  )}
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={isLocked ? "#CBD5E0" : isCurrent ? "#4C51BF" : "#A0AEC0"}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} activeOpacity={0.7}>
          <Ionicons name="home-outline" size={22} color="#718096" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButtonActive} activeOpacity={0.7}>
          <View style={styles.activeButtonIcon}>
            <Ionicons name="map" size={22} color="#4C51BF" />
          </View>
          <Text style={styles.footerTextActive}>Roadmap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={22} color="#718096" />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',

  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#EDF2F7',
  },
  resetButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#EBF4FF',
  },
  headerTitle: {
    fontSize: 35,
    fontFamily: 'Inter_600SemiBold',
    color: '#2D3748',
  },
  courseHeader: {
    padding: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  courseTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4C51BF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#718096',
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#718096',
    marginLeft: 6,
  },
  chaptersContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAFC',
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  currentChapter: {
    borderWidth: 1,
    borderColor: '#4C51BF',
    backgroundColor: '#F0F5FF',
  },
  lockedChapter: {
    opacity: 0.7,
  },
  chapterIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  completedIcon: {
    backgroundColor: '#38A169',
  },
  currentIcon: {
    backgroundColor: '#EBF4FF',
  },
  lockedIcon: {
    backgroundColor: '#EDF2F7',
  },
  chapterNumber: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#718096',
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#4A5568',
    marginBottom: 4,
  },
  chapterStatus: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#718096',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  footerButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
  },
  footerButtonActive: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
  },
  activeButtonIcon: {
    backgroundColor: '#EBF4FF',
    padding: 8,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#718096',
    marginTop: 4,
  },
  footerTextActive: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#4C51BF',
    marginTop: 4,
  },
});