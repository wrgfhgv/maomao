// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList, TextInput } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const { width, height } = Dimensions.get('window');

// const PetProfileScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { pet } = route.params || {};

//   const [petInfo, setPetInfo] = useState(null);
//   const [healthRecords, setHealthRecords] = useState([]);
//   const [reminders, setReminders] = useState([]);
//   const [gallery, setGallery] = useState([]);
//   const [activeTab, setActiveTab] = useState('info');
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [newReminder, setNewReminder] = useState({ title: '', date: new Date(), type: 'vaccine' });
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   // 模拟加载宠物数据
//   useEffect(() => {
//     loadPetData();
//   }, [pet]);

//   const loadPetData = async () => {
//     try {
//       setIsLoading(true);
//       // 模拟网络请求延迟
//       await new Promise(resolve => setTimeout(resolve, 800));

//       // 如果从路由参数中获取到宠物信息，就使用它，否则使用模拟数据
//       const petData = pet || {
//         id: 'pet1',
//         name: '奥利奥',
//         type: 'cat',
//         breed: '美短',
//         gender: 'male',
//         age: '2岁',
//         birthday: '2022-03-15',
//         avatar: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&q=80',
//         weight: '4.2kg',
//         lastVaccine: '2024-01-10',
//         nextVaccine: '2024-07-10',
//         lastCheckup: '2023-11-15',
//         nextCheckup: '2024-05-15',
//         allergies: '无',
//         description: '活泼好动，喜欢玩逗猫棒，爱吃鸡胸肉。',
//         foodPreference: '鸡肉口味猫粮',
//         favoriteToys: '逗猫棒、激光笔',
//         personality: '活泼、亲人、好奇心强',
//         sterilized: true,
//         microchipped: true,
//         chipNumber: 'CHN123456789'
//       };

//       // 模拟健康记录
//       const mockHealthRecords = [
//         {
//           id: 'hr1',
//           type: 'vaccine',
//           title: '狂犬疫苗',
//           date: '2024-01-10',
//           doctor: '李医生',
//           hospital: '宠物健康医院',
//           notes: '疫苗接种顺利，无不良反应',
//           nextDate: '2024-07-10',
//           status: '已完成'
//         },
//         {
//           id: 'hr2',
//           type: 'checkup',
//           title: '年度体检',
//           date: '2023-11-15',
//           doctor: '张医生',
//           hospital: '伴侣动物医院',
//           notes: '健康状况良好，体重正常，建议控制饮食',
//           nextDate: '2024-05-15',
//           status: '已完成'
//         },
//         {
//           id: 'hr3',
//           type: 'treatment',
//           title: '驱虫',
//           date: '2023-10-01',
//           doctor: '王医生',
//           hospital: '宠物健康医院',
//           notes: '体内外驱虫，无寄生虫',
//           nextDate: '2024-04-01',
//           status: '已完成'
//         },
//         {
//           id: 'hr4',
//           type: 'vaccine',
//           title: '猫三联疫苗',
//           date: '2023-07-20',
//           doctor: '李医生',
//           hospital: '宠物健康医院',
//           notes: '疫苗接种顺利，无不良反应',
//           nextDate: '2024-01-20',
//           status: '已完成'
//         }
//       ];

//       // 模拟提醒
//       const mockReminders = [
//         {
//           id: 'r1',
//           type: 'vaccine',
//           title: '狂犬疫苗接种',
//           date: '2024-07-10',
//           isCompleted: false,
//           daysLeft: 60
//         },
//         {
//           id: 'r2',
//           type: 'checkup',
//           title: '年度体检',
//           date: '2024-05-15',
//           isCompleted: false,
//           daysLeft: 15
//         },
//         {
//           id: 'r3',
//           type: 'treatment',
//           title: '驱虫',
//           date: '2024-04-01',
//           isCompleted: false,
//           daysLeft: 2
//         },
//         {
//           id: 'r4',
//           type: 'other',
//           title: '购买猫粮',
//           date: '2024-03-25',
//           isCompleted: true,
//           daysLeft: -5
//         }
//       ];

//       // 模拟相册
//       const mockGallery = [
//         {
//           id: 'g1',
//           uri: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&q=80',
//           date: '2024-02-15',
//           description: '奥利奥在晒太阳'
//         },
//         {
//           id: 'g2',
//           uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
//           date: '2024-01-20',
//           description: '奥利奥和奶茶玩耍'
//         },
//         {
//           id: 'g3',
//           uri: 'https://images.unsplash.com/photo-1478098711105-74a5ef77b457?auto=format&fit=crop&q=80',
//           date: '2023-12-10',
//           description: '奥利奥在睡觉'
//         },
//         {
//           id: 'g4',
//           uri: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80',
//           date: '2023-11-05',
//           description: '奥利奥的生日照'
//         },
//         {
//           id: 'g5',
//           uri: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80',
//           date: '2023-10-15',
//           description: '奥利奥在玩逗猫棒'
//         },
//         {
//           id: 'g6',
//           uri: 'https://images.unsplash.com/photo-1548819973-18326d690f95?auto=format&fit=crop&q=80',
//           date: '2023-09-20',
//           description: '奥利奥和主人的合影'
//         }
//       ];

//       setPetInfo(petData);
//       setHealthRecords(mockHealthRecords);
//       setReminders(mockReminders);
//       setGallery(mockGallery);
//     } catch (error) {
//       console.error('加载宠物数据失败:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 处理切换标签
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   // 处理编辑宠物资料
//   const handleEditPet = () => {
//     setIsEditing(true);
//   };

//   // 处理保存宠物资料
//   const handleSavePet = () => {
//     setIsEditing(false);
//     // 这里可以实现保存宠物资料的逻辑
//   };

//   // 处理添加健康记录
//   const handleAddHealthRecord = () => {
//     navigation.navigate('AddHealthRecord', { petId: petInfo?.id });
//   };

//   // 处理添加提醒
//   const handleAddReminder = () => {
//     // 这里可以实现添加提醒的逻辑
//     setShowDatePicker(true);
//   };

//   // 处理日期选择
//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setNewReminder(prev => ({ ...prev, date: selectedDate }));
//     }
//   };

//   // 处理保存提醒
//   const handleSaveReminder = () => {
//     if (newReminder.title.trim() === '') return;

//     const reminderToAdd = {
//       id: `r${Date.now()}`,
//       ...newReminder,
//       isCompleted: false,
//       // 计算剩余天数
//       daysLeft: Math.ceil((newReminder.date - new Date()) / (1000 * 60 * 60 * 24))
//     };

//     setReminders(prev => [reminderToAdd, ...prev]);
//     setNewReminder({ title: '', date: new Date(), type: 'vaccine' });
//     setShowEditModal(false);
//   };

//   // 处理标记提醒完成
//   const handleCompleteReminder = (id) => {
//     setReminders(prev =>
//       prev.map(reminder =>
//         reminder.id === id
//           ? { ...reminder, isCompleted: !reminder.isCompleted }
//           : reminder
//       )
//     );
//   };

//   // 处理添加照片
//   const handleAddPhoto = () => {
//     // 这里可以实现添加照片的逻辑
//     // 通常会打开相机或相册
//   };

//   // 处理查看照片详情
//   const handleViewPhoto = (photo) => {
//     navigation.navigate('PhotoDetail', { photo });
//   };

//   // 渲染健康记录项
//   const renderHealthRecordItem = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.healthRecordItem}
//         activeOpacity={0.7}
//         onPress={() => navigation.navigate('HealthRecordDetail', { record: item })}
//       >
//         <View style={[styles.healthRecordIcon, { backgroundColor: getRecordColor(item.type) }]}>
//           <Icon name={getRecordIcon(item.type)} size={18} color="#FFFFFF" />
//         </View>
//         <View style={styles.healthRecordContent}>
//           <View style={styles.healthRecordHeader}>
//             <Text style={styles.healthRecordTitle}>{item.title}</Text>
//             <Text style={styles.healthRecordDate}>{item.date}</Text>
//           </View>
//           <Text style={styles.healthRecordDoctor}>{item.doctor} · {item.hospital}</Text>
//           <Text style={styles.healthRecordNotes} numberOfLines={1}>{item.notes}</Text>
//           {item.nextDate && (
//             <View style={styles.nextDateContainer}>
//               <Text style={styles.nextDateLabel}>下次时间：</Text>
//               <Text style={styles.nextDateValue}>{item.nextDate}</Text>
//             </View>
//           )}
//         </View>
//         <Icon name="chevron-right" size={14} color="#CCC" />
//       </TouchableOpacity>
//     );
//   };

//   // 渲染提醒项
//   const renderReminderItem = ({ item }) => {
//     return (
//       <View style={styles.reminderItem}>
//         <TouchableOpacity
//           style={[styles.reminderCheckbox, item.isCompleted && styles.reminderCheckboxCompleted]}
//           onPress={() => handleCompleteReminder(item.id)}
//         >
//           {item.isCompleted && (
//             <Icon name="check" size={12} color="#FFFFFF" />
//           )}
//         </TouchableOpacity>
//         <View style={styles.reminderContent}>
//           <View style={styles.reminderHeader}>
//             <View style={[styles.reminderTypeBadge, { backgroundColor: getReminderColor(item.type) }]}>
//               <Text style={styles.reminderTypeText}>
//                 {getReminderTypeText(item.type)}
//               </Text>
//             </View>
//             <Text style={[styles.reminderTitle, item.isCompleted && styles.reminderTitleCompleted]}>
//               {item.title}
//             </Text>
//           </View>
//           <View style={styles.reminderFooter}>
//             <Text style={styles.reminderDate}>{formatDate(item.date)}</Text>
//             <Text style={[styles.reminderDays,
//               item.daysLeft < 0 ? styles.reminderDaysLate :
//               item.daysLeft <= 7 ? styles.reminderDaysSoon :
//               styles.reminderDaysNormal
//             ]}>
//               {item.daysLeft < 0 ? `已逾期${Math.abs(item.daysLeft)}天` :
//                item.daysLeft === 0 ? '今天到期' :
//                `还有${item.daysLeft}天`}
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   // 渲染相册照片项
//   const renderGalleryItem = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.galleryItem}
//         onPress={() => handleViewPhoto(item)}
//         activeOpacity={0.8}
//       >
//         <Image source={{ uri: item.uri }} style={styles.galleryImage} />
//         <View style={styles.galleryOverlay}>
//           <Text style={styles.galleryDate}>{item.date}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   // 获取健康记录图标
//   const getRecordIcon = (type) => {
//     switch (type) {
//       case 'vaccine':
//         return 'needle-outline';
//       case 'checkup':
//         return 'stethoscope-outline';
//       case 'treatment':
//         return 'medkit-outline';
//       default:
//         return 'file-medical-outline';
//     }
//   };

//   // 获取健康记录颜色
//   const getRecordColor = (type) => {
//     switch (type) {
//       case 'vaccine':
//         return '#4ECDC4';
//       case 'checkup':
//         return '#45B7D1';
//       case 'treatment':
//         return '#FF6B6B';
//       default:
//         return '#999';
//     }
//   };

//   // 获取提醒图标
//   const getReminderIcon = (type) => {
//     switch (type) {
//       case 'vaccine':
//         return 'needle-outline';
//       case 'checkup':
//         return 'stethoscope-outline';
//       case 'treatment':
//         return 'medkit-outline';
//       case 'other':
//         return 'calendar-outline';
//       default:
//         return 'bell-outline';
//     }
//   };

//   // 获取提醒颜色
//   const getReminderColor = (type) => {
//     switch (type) {
//       case 'vaccine':
//         return '#4ECDC4';
//       case 'checkup':
//         return '#45B7D1';
//       case 'treatment':
//         return '#FF6B6B';
//       case 'other':
//         return '#FFA500';
//       default:
//         return '#999';
//     }
//   };

//   // 获取提醒类型文本
//   const getReminderTypeText = (type) => {
//     switch (type) {
//       case 'vaccine':
//         return '疫苗';
//       case 'checkup':
//         return '体检';
//       case 'treatment':
//         return '治疗';
//       case 'other':
//         return '其他';
//       default:
//         return '提醒';
//     }
//   };

//   // 格式化日期
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // 渲染加载状态
//   if (isLoading || !petInfo) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>加载中...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container} edges={['right', 'left']}>
//       {/* 顶部导航栏 */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-left" size={18} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{petInfo.name}的档案</Text>
//         {isEditing ? (
//           <TouchableOpacity onPress={handleSavePet}>
//             <Text style={styles.headerAction}>保存</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity onPress={handleEditPet}>
//             <Text style={styles.headerAction}>编辑</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* 宠物基本信息 */}
//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         <View style={styles.avatarContainer}>
//           <Image source={{ uri: petInfo.avatar }} style={styles.avatar} />
//           <View style={[styles.typeBadge, { backgroundColor: petInfo.type === 'cat' ? '#FF6B6B' : '#4ECDC4' }]}>
//             <Icon name={petInfo.type === 'cat' ? 'cat' : 'dog'} size={12} color="#FFFFFF" />
//             <Text style={styles.typeBadgeText}>
//               {petInfo.type === 'cat' ? '猫咪' : '狗狗'}
//             </Text>
//           </View>
//           {petInfo.sterilized && (
//             <View style={styles.sterilizedBadge}>
//               <Text style={styles.sterilizedText}>已绝育</Text>
//             </View>
//           )}
//           {petInfo.microchipped && (
//             <View style={styles.microchipBadge}>
//               <Text style={styles.microchipText}>已植入芯片</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.basicInfoContainer}>
//           <View style={styles.nameContainer}>
//             <Text style={styles.petName}>{petInfo.name}</Text>
//             <Text style={styles.petGender}>{petInfo.gender === 'male' ? '♂' : '♀'}</Text>
//           </View>
//           <Text style={styles.petBreed}>{petInfo.breed}</Text>
//           <View style={styles.petMeta}>
//             <Text style={styles.petAge}>年龄：{petInfo.age}</Text>
//             <Text style={styles.petWeight}>体重：{petInfo.weight}</Text>
//           </View>
//           <Text style={styles.petDescription}>{petInfo.description}</Text>
//         </View>

//         {/* 内容切换标签 */}
//         <View style={styles.tabsContainer}>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === 'info' && styles.activeTab]}
//             onPress={() => handleTabChange('info')}
//           >
//             <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>基本信息</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === 'health' && styles.activeTab]}
//             onPress={() => handleTabChange('health')}
//           >
//             <Text style={[styles.tabText, activeTab === 'health' && styles.activeTabText]}>健康记录</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === 'reminders' && styles.activeTab]}
//             onPress={() => handleTabChange('reminders')}
//           >
//             <Text style={[styles.tabText, activeTab === 'reminders' && styles.activeTabText]}>提醒事项</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === 'gallery' && styles.activeTab]}
//             onPress={() => handleTabChange('gallery')}
//           >
//             <Text style={[styles.tabText, activeTab === 'gallery' && styles.activeTabText]}>宠物相册</Text>
//           </TouchableOpacity>
//         </View>

//         {/* 内容区域 */}
//         <View style={styles.contentContainer}>
//           {/* 基本信息 */}
//           {activeTab === 'info' && (
//             <View style={styles.infoSection}>
//               <View style={styles.infoItem}>
//                 <Text style={styles.infoLabel}>生日</Text>
//                 <Text style={styles.infoValue}>{petInfo.birthday}</Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <Text style={styles.infoLabel}>品种</Text>
//                 <Text style={styles.infoValue}>{petInfo.breed}</Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <Text style={styles.infoLabel}>性别</Text>
//                 <Text style={styles.infoValue}>{petInfo.gender === 'male' ? '公' : '母'}</Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <Text style={styles.infoLabel}>体重</Text>
//                 <Text style={styles.infoValue}>{petInfo.weight}</Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <Text style={styles.infoLabel}>过敏史</Text>
//                 <Text style={styles.infoValue}>{petInfo.allergies}</Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <Text style={styles.infoLabel}>性格特点</Text>
//                 <Text style={styles.infoValue}>{petInfo.personality}</Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <Text style={styles.infoLabel}>食物偏好</Text>
//                 <Text style={styles.infoValue}>{petInfo.foodPreference}</Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <Text style={styles.infoLabel}>喜欢的玩具</Text>
//                 <Text style={styles.infoValue}>{petInfo.favoriteToys}</Text>
//               </View>
//               {petInfo.microchipped && (
//                 <View style={styles.infoItem}>
//                   <Text style={styles.infoLabel}>芯片编号</Text>
//                   <Text style={styles.infoValue}>{petInfo.chipNumber}</Text>
//                 </View>
//               )}
//             </View>
//           )}

//           {/* 健康记录 */}
//           {activeTab === 'health' && (
//             <View style={styles.healthSection}>
//               <View style={styles.healthSummary}>
//                 <View style={styles.healthSummaryItem}>
//                   <Text style={styles.healthSummaryLabel}>最后疫苗</Text>
//                   <Text style={styles.healthSummaryValue}>{petInfo.lastVaccine}</Text>
//                   <Text style={styles.healthSummaryNext}>下次：{petInfo.nextVaccine}</Text>
//                 </View>
//                 <View style={styles.healthSummaryItem}>
//                   <Text style={styles.healthSummaryLabel}>最后体检</Text>
//                   <Text style={styles.healthSummaryValue}>{petInfo.lastCheckup}</Text>
//                   <Text style={styles.healthSummaryNext}>下次：{petInfo.nextCheckup}</Text>
//                 </View>
//               </View>

//               <FlatList
//                 data={healthRecords}
//                 renderItem={renderHealthRecordItem}
//                 keyExtractor={item => item.id}
//                 scrollEnabled={false}
//                 ItemSeparatorComponent={() => <View style={styles.separator} />}
//               />

//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={handleAddHealthRecord}
//                 activeOpacity={0.7}
//               >
//                 <Icon name="plus" size={16} color="#FF6B6B" />
//                 <Text style={styles.addButtonText}>添加健康记录</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           {/* 提醒事项 */}
//           {activeTab === 'reminders' && (
//             <View style={styles.remindersSection}>
//               <FlatList
//                 data={reminders.filter(r => !r.isCompleted).sort((a, b) => a.daysLeft - b.daysLeft)}
//                 renderItem={renderReminderItem}
//                 keyExtractor={item => item.id}
//                 scrollEnabled={false}
//                 ItemSeparatorComponent={() => <View style={styles.separator} />}
//                 ListEmptyComponent={
//                   <View style={styles.emptyContainer}>
//                     <Icon name="bell-outline" size={48} color="#CCC" />
//                     <Text style={styles.emptyText}>暂无待办提醒</Text>
//                   </View>
//                 }
//               />

//               {reminders.some(r => r.isCompleted) && (
//                 <View style={styles.completedSection}>
//                   <Text style={styles.completedTitle}>已完成</Text>
//                   <FlatList
//                     data={reminders.filter(r => r.isCompleted).sort((a, b) => new Date(b.date) - new Date(a.date))}
//                     renderItem={renderReminderItem}
//                     keyExtractor={item => item.id}
//                     scrollEnabled={false}
//                     ItemSeparatorComponent={() => <View style={styles.separator} />}
//                   />
//                 </View>
//               )}

//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => setShowEditModal(true)}
//                 activeOpacity={0.7}
//               >
//                 <Icon name="plus" size={16} color="#FF6B6B" />
//                 <Text style={styles.addButtonText}>添加提醒事项</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           {/* 宠物相册 */}
//           {activeTab === 'gallery' && (
//             <View style={styles.gallerySection}>
//               <FlatList
//                 data={gallery}
//                 renderItem={renderGalleryItem}
//                 keyExtractor={item => item.id}
//                 numColumns={3}
//                 scrollEnabled={false}
//                 columnWrapperStyle={styles.galleryRow}
//               />

//               <TouchableOpacity
//                 style={styles.addGalleryButton}
//                 onPress={handleAddPhoto}
//                 activeOpacity={0.7}
//               >
//                 <Icon name="camera" size={24} color="#999" />
//                 <Text style={styles.addGalleryButtonText}>添加照片</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* 底部空间，确保内容不被遮挡 */}
//         <View style={styles.bottomSpace} />
//       </ScrollView>

//       {/* 添加提醒的模态框 */}
//       {showEditModal && (
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>添加提醒</Text>
//               <TouchableOpacity onPress={() => setShowEditModal(false)}>
//                 <Icon name="close" size={16} color="#999" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <TextInput
//                 style={styles.modalInput}
//                 placeholder="提醒标题"
//                 placeholderTextColor="#999"
//                 value={newReminder.title}
//                 onChangeText={(text) => setNewReminder(prev => ({ ...prev, title: text }))}
//               />
//               <View style={styles.modalDateContainer}>
//                 <Text style={styles.modalLabel}>选择日期</Text>
//                 <TouchableOpacity
//                   style={styles.modalDateButton}
//                   onPress={() => setShowDatePicker(true)}
//                 >
//                   <Text style={styles.modalDateText}>
//                     {formatDate(newReminder.date.toISOString())}
//                   </Text>
//                   <Icon name="calendar-outline" size={16} color="#999" />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.modalTypeContainer}>
//                 <Text style={styles.modalLabel}>提醒类型</Text>
//                 <View style={styles.modalTypeOptions}>
//                   {['vaccine', 'checkup', 'treatment', 'other'].map((type) => (
//                     <TouchableOpacity
//                       key={type}
//                       style={[
//                         styles.modalTypeOption,
//                         newReminder.type === type && styles.modalTypeOptionSelected
//                       ]}
//                       onPress={() => setNewReminder(prev => ({ ...prev, type }))}
//                     >
//                       <Text style={[
//                         styles.modalTypeText,
//                         newReminder.type === type && styles.modalTypeTextSelected
//                       ]}>
//                         {getReminderTypeText(type)}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>
//             </View>
//             <View style={styles.modalFooter}>
//               <TouchableOpacity
//                 style={styles.modalCancelButton}
//                 onPress={() => setShowEditModal(false)}
//               >
//                 <Text style={styles.modalCancelButtonText}>取消</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalConfirmButton, !newReminder.title.trim() && styles.modalConfirmButtonDisabled]}
//                 onPress={handleSaveReminder}
//                 disabled={!newReminder.title.trim()}
//               >
//                 <Text style={styles.modalConfirmButtonText}>确定</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* 日期选择器 */}
//       {showDatePicker && (
//         <DateTimePicker
//           value={newReminder.date}
//           mode="date"
//           display="default"
//           onChange={handleDateChange}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   headerAction: {
//     fontSize: 14,
//     color: '#FF6B6B',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   avatarContainer: {
//     position: 'relative',
//     alignItems: 'center',
//     paddingTop: 24,
//     paddingBottom: 16,
//     backgroundColor: '#FFFFFF',
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 4,
//     borderColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   typeBadge: {
//     position: 'absolute',
//     top: 120,
//     right: width / 2 - 40,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FF6B6B',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#FFFFFF',
//   },
//   typeBadgeText: {
//     fontSize: 12,
//     color: '#FFFFFF',
//     marginLeft: 4,
//   },
//   sterilizedBadge: {
//     position: 'absolute',
//     top: 40,
//     left: width / 2 + 40,
//     backgroundColor: '#4ECDC4',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   sterilizedText: {
//     fontSize: 10,
//     color: '#FFFFFF',
//   },
//   microchipBadge: {
//     position: 'absolute',
//     top: 70,
//     left: width / 2 + 40,
//     backgroundColor: '#45B7D1',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   microchipText: {
//     fontSize: 10,
//     color: '#FFFFFF',
//   },
//   basicInfoContainer: {
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//     marginBottom: 16,
//   },
//   nameContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   petName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   petGender: {
//     fontSize: 20,
//     color: '#FF6B6B',
//     marginLeft: 8,
//   },
//   petBreed: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 8,
//   },
//   petMeta: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   petAge: {
//     fontSize: 14,
//     color: '#666',
//     marginRight: 16,
//   },
//   petWeight: {
//     fontSize: 14,
//     color: '#666',
//   },
//   petDescription: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#FF6B6B',
//   },
//   tabText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   activeTabText: {
//     color: '#FF6B6B',
//     fontWeight: '500',
//   },
//   contentContainer: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 16,
//   },
//   infoSection: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//   },
//   infoItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#999',
//   },
//   infoValue: {
//     fontSize: 14,
//     color: '#333',
//     fontWeight: '500',
//   },
//   healthSection: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   healthSummary: {
//     flexDirection: 'row',
//     padding: 16,
//     backgroundColor: '#FFF8E1',
//   },
//   healthSummaryItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   healthSummaryLabel: {
//     fontSize: 12,
//     color: '#8B4513',
//     marginBottom: 4,
//   },
//   healthSummaryValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#8B4513',
//     marginBottom: 2,
//   },
//   healthSummaryNext: {
//     fontSize: 12,
//     color: '#DAA520',
//   },
//   healthRecordItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     padding: 16,
//   },
//   healthRecordIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   healthRecordContent: {
//     flex: 1,
//   },
//   healthRecordHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   healthRecordTitle: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   healthRecordDate: {
//     fontSize: 12,
//     color: '#999',
//   },
//   healthRecordDoctor: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 4,
//   },
//   healthRecordNotes: {
//     fontSize: 13,
//     color: '#666',
//     marginBottom: 4,
//   },
//   nextDateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   nextDateLabel: {
//     fontSize: 12,
//     color: '#999',
//   },
//   nextDateValue: {
//     fontSize: 12,
//     color: '#FF6B6B',
//   },
//   remindersSection: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   reminderItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     padding: 16,
//   },
//   reminderCheckbox: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: '#DDD',
//     marginRight: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   reminderCheckboxCompleted: {
//     backgroundColor: '#4ECDC4',
//     borderColor: '#4ECDC4',
//   },
//   reminderContent: {
//     flex: 1,
//   },
//   reminderHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   reminderTypeBadge: {
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   reminderTypeText: {
//     fontSize: 10,
//     color: '#FFFFFF',
//   },
//   reminderTitle: {
//     fontSize: 15,
//     color: '#333',
//   },
//   reminderTitleCompleted: {
//     color: '#999',
//     textDecorationLine: 'line-through',
//   },
//   reminderFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   reminderDate: {
//     fontSize: 12,
//     color: '#999',
//   },
//   reminderDays: {
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   reminderDaysNormal: {
//     color: '#4ECDC4',
//   },
//   reminderDaysSoon: {
//     color: '#FFA500',
//   },
//   reminderDaysLate: {
//     color: '#FF3B30',
//   },
//   completedSection: {
//     padding: 16,
//     backgroundColor: '#F9F9F9',
//   },
//   completedTitle: {
//     fontSize: 14,
//     color: '#999',
//     marginBottom: 12,
//   },
//   gallerySection: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   galleryRow: {
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   galleryItem: {
//     width: (width - 64) / 3,
//     aspectRatio: 1,
//     borderRadius: 8,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   galleryImage: {
//     width: '100%',
//     height: '100%',
//   },
//   galleryOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 4,
//   },
//   galleryDate: {
//     fontSize: 10,
//     color: '#FFFFFF',
//   },
//   addGalleryButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     backgroundColor: '#F9F9F9',
//     borderRadius: 8,
//     marginTop: 8,
//   },
//   addGalleryButtonText: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   addButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 12,
//     backgroundColor: '#FFF0F0',
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   addButtonText: {
//     fontSize: 14,
//     color: '#FF6B6B',
//     marginLeft: 8,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#EEEEEE',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 40,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 16,
//   },
//   bottomSpace: {
//     height: 80,
//   },
//   modalOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//     zIndex: 1000,
//   },
//   modalContainer: {
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 16,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   modalTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   modalContent: {
//     marginBottom: 16,
//   },
//   modalInput: {
//     backgroundColor: '#F0F0F0',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 16,
//   },
//   modalLabel: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//   },
//   modalDateContainer: {
//     marginBottom: 16,
//   },
//   modalDateButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#F0F0F0',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   modalDateText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   modalTypeContainer: {
//     marginBottom: 8,
//   },
//   modalTypeOptions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   modalTypeOption: {
//     backgroundColor: '#F0F0F0',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   modalTypeOptionSelected: {
//     backgroundColor: '#FF6B6B',
//   },
//   modalTypeText: {
//     fontSize: 12,
//     color: '#666',
//   },
//   modalTypeTextSelected: {
//     color: '#FFFFFF',
//   },
//   modalFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalCancelButton: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F0F0F0',
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   modalCancelButtonText: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: 'bold',
//   },
//   modalConfirmButton: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FF6B6B',
//     borderRadius: 8,
//     marginLeft: 8,
//   },
//   modalConfirmButtonDisabled: {
//     backgroundColor: '#CCC',
//   },
//   modalConfirmButtonText: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
// });

// export default PetProfileScreen;
