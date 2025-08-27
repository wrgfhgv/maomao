import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Marker } from 'react-native-maps';

interface MapMarkerProps {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  type: 'cat' | 'dog' | 'other';
  status: 'found' | 'rescued' | 'adopted' | 'in-progress';
  image?: string;
  name?: string;
  timeAgo?: string;
  onPress?: () => void;
  onInfoPress?: () => void;
  showInfo?: boolean;
  isSelected?: boolean;
}

const { width } = Dimensions.get('window');

const MapMarker: React.FC<MapMarkerProps> = ({
  id,
  coordinate,
  type,
  status,
  image,
  name,
  timeAgo,
  onPress,
  onInfoPress,
  showInfo = false,
  isSelected = false,
}) => {
  // 根据状态获取颜色
  const getStatusColor = () => {
    switch (status) {
      case 'found':
        return '#FF6B6B'; // 红色 - 新发现
      case 'in-progress':
        return '#FFD93D'; // 黄色 - 进行中
      case 'rescued':
        return '#6BCB77'; // 绿色 - 已救助
      case 'adopted':
        return '#4D96FF'; // 蓝色 - 已领养
      default:
        return '#FF6B6B';
    }
  };

  // 根据类型获取图标
  const getTypeIcon = () => {
    switch (type) {
      case 'cat':
        return 'cat';
      case 'dog':
        return 'paw';
      default:
        return 'heart';
    }
  };

  // 根据状态获取文本
  const getStatusText = () => {
    switch (status) {
      case 'found':
        return '新发现';
      case 'in-progress':
        return '救助中';
      case 'rescued':
        return '已救助';
      case 'adopted':
        return '已领养';
      default:
        return '未知';
    }
  };

  const statusColor = getStatusColor();
  const typeIcon = getTypeIcon();
  const statusText = getStatusText();

  return (
    <Marker
      coordinate={coordinate}
      onPress={onPress}
    >
      <View>
        {/* 标记图标 */}
        <View 
          style={[
            styles.markerContainer,
            { backgroundColor: statusColor },
            isSelected && styles.selectedMarker
          ]}
        >
          <Icon name={typeIcon} size={16} color="#FFFFFF" />
        </View>
        
        {/* 信息窗口 */}
        {showInfo && (
          <View style={styles.infoWindow}>
            <View style={styles.infoContent}>
              {image && (
                <Image 
                  source={{ uri: image }} 
                  style={styles.infoImage} 
                />
              )}
              
              <View style={styles.infoTextContainer}>
                {name && <Text style={styles.infoName} numberOfLines={1}>{name}</Text>}
                
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{statusText}</Text>
                </View>
                
                {timeAgo && <Text style={styles.infoTimeAgo}>{timeAgo}</Text>}
              </View>
              
              {onInfoPress && (
                <TouchableOpacity 
                  style={styles.infoButton} 
                  onPress={onInfoPress}
                >
                  <Icon name="info-circle" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
            
            {/* 小箭头 */}
            <View style={styles.arrow} />
          </View>
        )}
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedMarker: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  infoWindow: {
    position: 'absolute',
    top: -120,
    left: -60,
    width: 120,
    zIndex: 10,
  },
  infoContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
  },
  infoImage: {
    width: 100,
    height: 80,
    borderRadius: 4,
    marginBottom: 4,
  },
  infoTextContainer: {
    flexDirection: 'column',
  },
  infoName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
    marginBottom: 2,
  },
  statusBadgeText: {
    fontSize: 10,
    color: '#666666',
  },
  infoTimeAgo: {
    fontSize: 10,
    color: '#999999',
  },
  infoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4D96FF',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    top: 106,
    left: 56,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
});

export default MapMarker;