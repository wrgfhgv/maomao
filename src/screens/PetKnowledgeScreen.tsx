import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  // Dimensions,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// const { width, height } = Dimensions.get('window');
// 定义路由参数类型
export type AnswerType = {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  likeCount: number;
  publishDate: string;
  isExpert: boolean;
};

export type QuestionType = {
  id: string;
  question: string;
  category: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  viewCount: number;
  answerCount: number;
  bestAnswer?: AnswerType;
};

export type PetKnowledgeParamList = {
  ArticleDetail: { article: ArticleType };
  ExpertDetail: { expert: ExpertType };
  QuestionDetail: { question: QuestionType };
  AnswerDetail: { answer: AnswerType };
  AskQuestion: undefined;
};

type ArticleType = {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  author: string;
  authorAvatar: string;
  publishTime: string;
  summary: string;
  readCount: number;
  commentCount: number;
  likeCount: number;
  publishDate: string;
};

type ExpertType = {
  id: string;
  name: string;
  title: string;
  hospital: string;
  avatar: string;
  specialty: string;
  experience: string;
  answerCount: number;
  satisfactionRate: number;
  followers: number;
  description: string;
};

type CategoriesType = { id: string; name: string; icon: string };

const PetKnowledgeScreen = () => {
  const navigation = useNavigation<NavigationProp<PetKnowledgeParamList>>();

  const [categories, setCategories] = useState<
    Array<{ id: string; name: string; icon: string }>
  >([]);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [experts, setExperts] = useState<ExpertType[]>([]);
  const [faq, setFaq] = useState<QuestionType[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('articles'); // articles, experts, qa

  // 模拟加载数据
  useEffect(() => {
    loadData();
  }, []);

  const generateItemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      // 模拟网络请求延迟
      await new Promise(resolve =>
        setTimeout(() => resolve('模拟网络请求'), 800),
      );

      // 模拟分类数据
      const mockCategories: CategoriesType[] = [
        { id: 'all', name: '全部', icon: 'book-open-outline' },
        { id: 'health', name: '健康养护', icon: 'heart-outline' },
        { id: 'training', name: '训练指南', icon: 'school-outline' },
        { id: 'food', name: '饮食营养', icon: 'pizza-outline' },
        { id: 'breed', name: '品种知识', icon: 'layers-outline' },
        { id: 'behavior', name: '行为解析', icon: 'activity-outline' },
        { id: 'tools', name: '用品指南', icon: 'build-outline' },
        { id: 'baby', name: '幼宠护理', icon: 'heart-dislike-outline' },
      ];

      // 模拟文章数据
      const mockArticles = [
        {
          id: 'a1',
          title: '猫咪疫苗接种全攻略，新手必看',
          category: 'health',
          coverImage:
            'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80',
          author: '宠物健康专家',
          authorAvatar:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
          readCount: 2538,
          commentCount: 126,
          likeCount: 452,
          publishDate: '2024-03-20',
          summary:
            '本文详细介绍了猫咪疫苗接种的重要性、接种时间安排、疫苗种类、注意事项以及常见问题解答，帮助新手宠物主全面了解猫咪疫苗接种知识。',
        },
        {
          id: 'a2',
          title: '狗狗训练技巧：如何快速教会狗狗定点排便',
          category: 'training',
          coverImage:
            'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80',
          author: '专业训犬师',
          authorAvatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
          readCount: 1876,
          commentCount: 98,
          likeCount: 321,
          publishDate: '2024-03-15',
          summary:
            '本文分享了专业训犬师的经验，教你如何通过正向激励和科学方法，快速教会狗狗定点排便，解决新手养狗的一大难题。',
        },
        {
          id: 'a3',
          title: '宠物饮食误区：这些食物绝对不能给宠物吃',
          category: 'food',
          coverImage:
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80',
          author: '宠物营养师',
          authorAvatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
          readCount: 3241,
          commentCount: 189,
          likeCount: 567,
          publishDate: '2024-03-10',
          summary:
            '很多宠物主可能不知道，一些人类常吃的食物对宠物来说是有毒的。本文列出了绝对不能给宠物吃的食物清单，以及误食后的急救措施。',
        },
        {
          id: 'a4',
          title: '如何判断你的猫咪是否健康？7个关键指标',
          category: 'health',
          coverImage:
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80',
          author: '宠物医生',
          authorAvatar:
            'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80',
          readCount: 2876,
          commentCount: 156,
          likeCount: 489,
          publishDate: '2024-03-05',
          summary:
            '作为猫咪主人，了解如何判断猫咪的健康状况非常重要。本文介绍了7个关键的健康指标，帮助你及时发现猫咪的健康问题。',
        },
        {
          id: 'a5',
          title: '新手养狗必看：选择适合你的狗狗品种',
          category: 'breed',
          coverImage:
            'https://images.unsplash.com/photo-1507301158492-4d0456886565?auto=format&fit=crop&q=80',
          author: '宠物行为学家',
          authorAvatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
          readCount: 2145,
          commentCount: 132,
          likeCount: 398,
          publishDate: '2024-02-28',
          summary:
            '不同的狗狗品种有不同的性格特点和饲养要求。本文分析了常见狗狗品种的特点，帮助新手选择最适合自己生活方式的狗狗。',
        },
        {
          id: 'a6',
          title: '猫咪为什么会舔你？解析猫咪的10种常见行为',
          category: 'behavior',
          coverImage:
            'https://images.unsplash.com/photo-1478098711105-74a5ef77b457?auto=format&fit=crop&q=80',
          author: '宠物心理专家',
          authorAvatar:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80',
          readCount: 3567,
          commentCount: 203,
          likeCount: 621,
          publishDate: '2024-02-20',
          summary:
            '猫咪的行为往往让主人感到困惑。本文解析了猫咪常见的10种行为背后的含义，帮助你更好地理解你的猫咪朋友。',
        },
      ] as ArticleType[];

      // 模拟专家数据
      const mockExperts = [
        {
          id: 'e1',
          name: '张医生',
          title: '宠物医学专家',
          hospital: '宠物健康医院',
          avatar:
            'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80',
          specialty: '犬猫疾病诊疗',
          experience: '15年临床经验',
          answerCount: 2345,
          satisfactionRate: 98,
          followers: 12567,
          description:
            '毕业于中国农业大学兽医学院，专注于犬猫常见疾病的诊断与治疗，尤其擅长内科疾病和传染病的防治。',
        },
        {
          id: 'e2',
          name: '李训练师',
          title: '专业训犬师',
          hospital: '快乐宠物训练学校',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
          specialty: '犬类行为矫正',
          experience: '10年训练经验',
          answerCount: 1876,
          satisfactionRate: 97,
          followers: 9876,
          description:
            '国际认证训犬师，擅长使用正向激励方法训练狗狗，尤其在犬类行为问题矫正方面有丰富经验。',
        },
        {
          id: 'e3',
          name: '王营养师',
          title: '宠物营养师',
          hospital: '宠物营养研究所',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
          specialty: '宠物营养配制',
          experience: '8年研究经验',
          answerCount: 1567,
          satisfactionRate: 96,
          followers: 8765,
          description:
            '专注于宠物营养研究，擅长根据宠物的年龄、品种、健康状况制定个性化的营养方案，著有多部宠物营养专著。',
        },
        {
          id: 'e4',
          name: '陈医生',
          title: '猫咪专科医生',
          hospital: '伴侣动物医院',
          avatar:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
          specialty: '猫咪疾病与行为',
          experience: '12年临床经验',
          answerCount: 2103,
          satisfactionRate: 99,
          followers: 11234,
          description:
            '专注于猫咪医学研究，对猫咪的常见疾病和行为问题有深入研究，是国内知名的猫咪专科医生。',
        },
      ] as ExpertType[];

      // 模拟问答数据
      const mockFaq: QuestionType[] = [
        {
          id: 'q1',
          question: '猫咪总是乱尿怎么办？',
          category: 'behavior',
          author: '用户12345',
          authorAvatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
          publishDate: '2024-03-22',
          viewCount: 1256,
          answerCount: 8,
          bestAnswer: {
            id: 'a1',
            author: '陈医生',
            authorAvatar:
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
            content:
              '猫咪乱尿可能有多种原因，包括生理因素（如泌尿系统疾病）、心理因素（如压力、焦虑）或环境因素（如猫砂盆位置不合适、猫砂类型不喜欢等）。建议先带猫咪去看兽医排除健康问题，然后检查猫砂盆的数量、位置和清洁度，同时观察猫咪的生活环境是否有变化导致压力增加。',
            likeCount: 128,
            publishDate: '2024-03-22',
            isExpert: true,
          },
        },
        {
          id: 'q2',
          question: '狗狗总吃自己的便便怎么办？',
          category: 'behavior',
          author: '用户67890',
          authorAvatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
          publishDate: '2024-03-20',
          viewCount: 897,
          answerCount: 6,
          bestAnswer: {
            id: 'a2',
            author: '李训练师',
            authorAvatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
            content:
              '狗狗吃便便的行为称为异食癖，可能是由于营养缺乏、肠道寄生虫、无聊或压力等原因引起的。建议首先确保狗狗的饮食营养均衡，定期驱虫，增加狗狗的运动量和互动时间，同时当狗狗出现吃便便行为时，及时制止并引导，使用正向激励的方法训练狗狗放弃这种行为。',
            likeCount: 98,
            publishDate: '2024-03-21',
            isExpert: true,
          },
        },
        {
          id: 'q3',
          question: '如何给猫咪洗澡不反抗？',
          category: 'health',
          author: '新手养猫人',
          authorAvatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
          publishDate: '2024-03-18',
          viewCount: 1567,
          answerCount: 12,
          bestAnswer: {
            id: 'a3',
            author: '陈医生',
            authorAvatar:
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
            content:
              '给猫咪洗澡需要耐心和技巧。建议从猫咪小时候开始培养洗澡习惯，使用猫咪专用沐浴露，洗澡前让猫咪熟悉浴室环境，洗澡时注意保暖，避免水进入猫咪的耳朵和眼睛，洗澡后及时吹干。可以在洗澡过程中给予猫咪零食奖励，让猫咪逐渐适应洗澡。',
            likeCount: 156,
            publishDate: '2024-03-19',
            isExpert: true,
          },
        },
      ];

      setCategories(mockCategories);
      setArticles(mockArticles);
      setExperts(mockExperts);
      setFaq(mockFaq);
    } catch (error) {
      console.error('加载知识数据失败:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // 处理刷新
  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  // 处理切换分类
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // 这里可以根据分类过滤文章
  };

  // 处理搜索
  const handleSearch = () => {
    // 这里可以实现搜索逻辑
  };

  // 处理查看文章详情
  const handleViewArticle = (article: ArticleType) => {
    navigation.navigate('ArticleDetail', { article });
  };

  // 处理查看专家详情
  const handleViewExpert = (expert: ExpertType) => {
    navigation.navigate('ExpertDetail', { expert });
  };

  // 处理查看问答详情
  const handleViewQuestion = (question: QuestionType) => {
    navigation.navigate('QuestionDetail', { question });
  };

  // 处理发起提问
  const handleAskQuestion = () => {
    navigation.navigate('AskQuestion');
  };

  // 处理关注专家
  const handleFollowExpert = (expertId: string) => {
    // 这里可以实现关注专家的逻辑
    console.log('关注专家:', expertId);
  };

  // 渲染分类项
  const renderCategoryItem = ({
    item,
  }: {
    item: { id: string; name: string; icon: string };
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          activeCategory === item.id && styles.activeCategoryItem,
        ]}
        onPress={() => handleCategoryChange(item.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.categoryIcon,
            activeCategory === item.id && styles.activeCategoryIcon,
          ]}
        >
          <Icon
            name={item.icon}
            size={16}
            color={activeCategory === item.id ? '#FFFFFF' : '#666'}
          />
        </View>
        <Text
          style={[
            styles.categoryName,
            activeCategory === item.id && styles.activeCategoryName,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // 渲染文章项
  const renderArticleItem = ({ item }: { item: ArticleType }) => {
    return (
      <TouchableOpacity
        style={styles.articleItem}
        onPress={() => handleViewArticle(item)}
        activeOpacity={0.7}
      >
        <View style={styles.articleContent}>
          <Text style={styles.articleTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.articleSummary} numberOfLines={2}>
            {item.summary}
          </Text>
          <View style={styles.articleFooter}>
            <View style={styles.authorContainer}>
              <Image
                source={{ uri: item.authorAvatar }}
                style={styles.authorAvatar}
              />
              <Text style={styles.authorName}>{item.author}</Text>
            </View>
            <View style={styles.articleStats}>
              <View style={styles.statItem}>
                <Icon name="eye-outline" size={12} color="#999" />
                <Text style={styles.statText}>{item.readCount}</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="message-circle-outline" size={12} color="#999" />
                <Text style={styles.statText}>{item.commentCount}</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="heart-outline" size={12} color="#999" />
                <Text style={styles.statText}>{item.likeCount}</Text>
              </View>
            </View>
          </View>
        </View>
        <Image source={{ uri: item.coverImage }} style={styles.articleImage} />
      </TouchableOpacity>
    );
  };

  // 渲染专家项
  const renderExpertItem = ({ item }: { item: ExpertType }) => {
    return (
      <TouchableOpacity
        style={styles.expertItem}
        onPress={() => handleViewExpert(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.avatar }} style={styles.expertAvatar} />
        <View style={styles.expertInfo}>
          <View style={styles.expertNameContainer}>
            <Text style={styles.expertName}>{item.name}</Text>
            <Text style={styles.expertTitle}>{item.title}</Text>
          </View>
          <Text style={styles.expertHospital}>{item.hospital}</Text>
          <Text style={styles.expertSpecialty}>专长：{item.specialty}</Text>
          <View style={styles.expertStats}>
            <View style={styles.statItem}>
              <Text style={styles.statText}>{item.answerCount}回答</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statText}>{item.satisfactionRate}%满意</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statText}>
                {item.followers.toLocaleString()}关注
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.followButton}
          onPress={() => handleFollowExpert(item.id)}
        >
          <Text style={styles.followButtonText}>关注</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // 渲染问答项
  const renderQuestionItem = ({ item }: { item: QuestionType }) => {
    return (
      <TouchableOpacity
        style={styles.questionItem}
        onPress={() => handleViewQuestion(item)}
        activeOpacity={0.7}
      >
        <View style={styles.questionHeader}>
          <View style={styles.questionAuthor}>
            <Image
              source={{ uri: item.authorAvatar }}
              style={styles.authorAvatar}
            />
            <Text style={styles.authorName}>{item.author}</Text>
            <Text style={styles.questionDate}>{item.publishDate}</Text>
          </View>
          <View style={styles.questionStats}>
            <View style={styles.statItem}>
              <Icon name="eye-outline" size={12} color="#999" />
              <Text style={styles.statText}>{item.viewCount}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="message-circle-outline" size={12} color="#999" />
              <Text style={styles.statText}>{item.answerCount}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.questionText}>{item.question}</Text>
        {item.bestAnswer && (
          <View style={styles.bestAnswer}>
            <View style={styles.bestAnswerHeader}>
              <View style={styles.bestAnswerAuthor}>
                <Image
                  source={{ uri: item.bestAnswer.authorAvatar }}
                  style={styles.answerAuthorAvatar}
                />
                <Text style={styles.answerAuthorName}>
                  {item.bestAnswer.author}
                </Text>
                {item.bestAnswer.isExpert && (
                  <View style={styles.expertBadge}>
                    <Text style={styles.expertBadgeText}>专家</Text>
                  </View>
                )}
              </View>
              <View style={styles.bestAnswerStats}>
                <Icon name="thumbs-up-outline" size={12} color="#999" />
                <Text style={styles.statText}>{item.bestAnswer.likeCount}</Text>
              </View>
            </View>
            <Text style={styles.bestAnswerContent} numberOfLines={2}>
              {item.bestAnswer.content}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // 过滤显示的文章
  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter(article => article.category === activeCategory);

  // 渲染加载状态
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>宠物知识</Text>
        <TouchableOpacity onPress={handleAskQuestion}>
          <Icon name="help-circle-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {/* 搜索栏 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon
            name="search"
            size={16}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索知识、问题、专家"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>搜索</Text>
        </TouchableOpacity>
      </View>

      {/* 标签切换 */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'articles' && styles.activeTab]}
          onPress={() => setActiveTab('articles')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'articles' && styles.activeTabText,
            ]}
          >
            知识文章
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'experts' && styles.activeTab]}
          onPress={() => setActiveTab('experts')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'experts' && styles.activeTabText,
            ]}
          >
            专家咨询
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'qa' && styles.activeTab]}
          onPress={() => setActiveTab('qa')}
        >
          <Text
            style={[styles.tabText, activeTab === 'qa' && styles.activeTabText]}
          >
            问答社区
          </Text>
        </TouchableOpacity>
      </View>

      {/* 内容区域 */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#FF6B6B']}
            tintColor="#FF6B6B"
          />
        }
      >
        {/* 文章内容 */}
        {activeTab === 'articles' && (
          <View style={styles.contentContainer}>
            {/* 分类横向滚动 */}
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesList}
              contentContainerStyle={styles.categoriesContainer}
            />

            {/* 文章列表 */}
            <FlatList
              data={filteredArticles}
              renderItem={renderArticleItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={generateItemSeparatorComponent}
            />
          </View>
        )}

        {/* 专家内容 */}
        {activeTab === 'experts' && (
          <View style={styles.contentContainer}>
            <FlatList
              data={experts}
              renderItem={renderExpertItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={generateItemSeparatorComponent}
            />
          </View>
        )}

        {/* 问答内容 */}
        {activeTab === 'qa' && (
          <View style={styles.contentContainer}>
            <FlatList
              data={faq}
              renderItem={renderQuestionItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={generateItemSeparatorComponent}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.askButton}
                  onPress={handleAskQuestion}
                  activeOpacity={0.7}
                >
                  <Icon name="plus-circle" size={16} color="#FF6B6B" />
                  <Text style={styles.askButtonText}>发起提问</Text>
                </TouchableOpacity>
              }
            />
          </View>
        )}

        {/* 底部空间，确保内容不被遮挡 */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  searchButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  categoriesList: {
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  activeCategoryItem: {
    // 选中状态样式
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeCategoryIcon: {
    backgroundColor: '#FF6B6B',
  },
  categoryName: {
    fontSize: 12,
    color: '#666',
  },
  activeCategoryName: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  articleItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  articleContent: {
    flex: 1,
    marginRight: 12,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  articleSummary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 12,
    color: '#666',
  },
  articleStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  statText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  articleImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  expertItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  expertAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  expertInfo: {
    flex: 1,
  },
  expertNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  expertName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  expertTitle: {
    fontSize: 12,
    color: '#666',
  },
  expertHospital: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  expertSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  expertStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  followButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  questionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionDate: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  questionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  bestAnswer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  bestAnswerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bestAnswerAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerAuthorAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  answerAuthorName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  expertBadge: {
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 6,
  },
  expertBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  bestAnswerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bestAnswerContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  askButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  askButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  separator: {
    height: 8,
  },
  bottomSpace: {
    height: 80,
  },
});

export default PetKnowledgeScreen;
