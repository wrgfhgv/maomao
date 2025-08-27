import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PetProfileCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'male' | 'female';
  avatar: string;
  weight?: string;
  birthDate?: string;
  personality?: string[];
  healthCondition?: string;
  isFavorite?: boolean;
  onEditPress?: () => void;
  onSharePress?: () => void;
  onFavoritePress?: () => void;
}

const { width } = Dimensions.get('window');

const PetProfileCard: React.FC<PetProfileCardProps> = ({
  id,
  name,
  breed,
  age,
  gender,
  avatar,
  weight,
  birthDate,
  personality = [],
  healthCondition,
  isFavorite = false,
  onEditPress,
  onSharePress,
  onFavoritePress,
}) => {
  return (
    <View style={styles.container}>
      {/* 顶部信息区 */}
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: avatar || 'https://via.placeholder.com/100' }} 
            style={styles.avatar}
          />
        </View>
        
        <View style={styles.petInfoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            <View style={[styles.genderBadge, gender === 'male' ? styles.maleBadge : styles.femaleBadge]}>
              <Icon 
                name={gender === 'male' ? 'male' : 'female'} 
                size={14} 
                color={gender === 'male' ? '#4285F4' : '#EA4335'} 
              />
              <Text style={[styles.genderText, gender === 'male' ? styles.maleText : styles.femaleText]}>
                {gender === 'male' ? '公' : '母'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.breed}>{breed}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>年龄</Text>
              <Text style={styles.statValue}>{age}</Text>
            </View>
            {weight && (
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>体重</Text>
                <Text style={styles.statValue}>{weight}</Text>
              </View>
            )}
            {birthDate && (
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>生日</Text>
                <Text style={styles.statValue}>{birthDate}</Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          {onFavoritePress && (
            <TouchableOpacity 
              style={styles.favoriteButton} 
              onPress={onFavoritePress}
            >
              <Icon 
                name={isFavorite ? 'heart' : 'heart-outline'} 
                size={20} 
                color={isFavorite ? '#FF6B6B' : '#666666'} 
              />
            </TouchableOpacity>
          )}
          {onEditPress && (
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={onEditPress}
            >
              <Icon name="pencil-outline" size={20} color="#666666" />
            </TouchableOpacity>
          )}
          {onSharePress && (
            <TouchableOpacity 
              style={styles.shareButton} 
              onPress={onSharePress}
            >
              <Icon name="share-outline" size={20} color="#666666" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* 中间信息区 */}
      <View style={styles.middleContainer}>
        {/* 性格标签 */}
        {personality.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>性格特点</Text>
            <View style={styles.tagsContainer}>
              {personality.map((trait, index) => (
                <View key={index} style={styles.personalityTag}>
                  <Text style={styles.personalityTagText}>{trait}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {/* 健康状况 */}
        {healthCondition && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>健康状况</Text>
            <View style={styles.healthContainer}>
              <Icon name="heart-pulse" size={16} color="#34A853" />
              <Text style={styles.healthText}>{healthCondition}</Text>
            </View>
          </View>
        )}
      </View>
      
      {/* 底部快捷操作区 */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Icon name="calendar" size={16} color="#4285F4" />
          <Text style={styles.quickActionText}>医疗提醒</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <Icon name="stethoscope" size={16} color="#EA4335" />
          <Text style={styles.quickActionText}>健康记录</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <Icon name="camera" size={16} color="#34A853" />
          <Text style={styles.quickActionText}>相册</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionButton}>
          <Icon name="weight" size={16} color="#FFD700" />
          <Text style={styles.quickActionText}>体重记录</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  petInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 8,
  },
  genderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  maleBadge: {
    backgroundColor: '#E8F5E9',
  },
  femaleBadge: {
    backgroundColor: '#FFEBEE',
  },
  genderText: {
    fontSize: 12,
    marginLeft: 4,
  },
  maleText: {
    color: '#4285F4',
  },
  femaleText: {
    color: '#EA4335',
  },
  breed: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    marginRight: 16,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
  },
  statValue: {
    fontSize: 14,
    color: '#333333',
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  personalityTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  personalityTagText: {
    fontSize: 12,
    color: '#666666',
  },
  healthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
  },
  healthText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
});

export default PetProfileCard;