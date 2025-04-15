import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const LessonCompleteScreen = () => {
  const router = useRouter();
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Confetti Animation - More contained */}
      <View style={styles.confettiContainer}>
        <LottieView
          source={require('../assets/confetti.json')}
          autoPlay
          loop={false}
          style={styles.confetti}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#4A5568" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>LESSON</Text>
            <Text style={styles.completeTitle}>COMPLETE!</Text>
            <View style={styles.divider} />
          </View>

          {/* Stats Container */}
          <View style={styles.statsContainer}>
            {/* XP Card */}
            <View style={styles.statCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="star" size={20} color="#F6AD55" />
                <Text style={styles.statLabel}>XP EARNED</Text>
              </View>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>13</Text>
              </View>
              <Text style={styles.statSubtext}>Points added to your total</Text>
            </View>

            {/* Score Card */}
            <View style={styles.statCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="stats-chart" size={20} color="#68D391" />
                <Text style={styles.statLabel}>PERFORMANCE</Text>
              </View>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>95%</Text>
              </View>
              <Text style={styles.statSubtext}>Excellent accuracy!</Text>
            </View>
          </View>

          {/* Celebration Trophy */}
          <View style={styles.celebrationImage}>
            <Ionicons name="trophy" size={80} color="#F6E05E" />
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Animated.View style={[{ transform: [{ scale: scaleValue }] }, styles.buttonAnimatedWrapper]}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => router.push('../roadmap')}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Continue Your Journey</Text>
              <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%', // Reduced height
    zIndex: 1,
    overflow: 'hidden',
  },
  confetti: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    zIndex: 2,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#2D3748',
    letterSpacing: -0.5,
  },
  completeTitle: {
    fontSize: 40,
    fontFamily: 'Inter_800ExtraBold',
    color: '#4C51BF',
    letterSpacing: -0.5,
    marginTop: -8,
  },
  divider: {
    height: 4,
    width: 80,
    backgroundColor: '#4C51BF',
    borderRadius: 2,
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 8,
  },
  statValueContainer: {
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  statValue: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 28,
    color: '#4C51BF',
  },
  statSubtext: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
  },
  celebrationImage: {
    backgroundColor: 'white',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },
  buttonAnimatedWrapper: {
    width: '100%',
  },
  continueButton: {
    backgroundColor: '#4C51BF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4C51BF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Inter_700Bold',
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});

export default LessonCompleteScreen;