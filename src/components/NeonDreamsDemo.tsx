import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  Share2, 
  Download, 
  Eye, 
  Zap, 
  Sparkles, 
  Star, 
  Filter, 
  Grid, 
  List, 
  Search, 
  ShoppingCart, 
  Wallet, 
  TrendingUp, 
  Award, 
  Users, 
  Globe, 
  Lock, 
  Unlock, 
  Timer, 
  Flame, 
  Crown, 
  Diamond, 
  Hexagon, 
  Triangle, 
  Circle, 
  Square,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Palette,
  Code,
  Camera
} from 'lucide-react';

interface NeonDreamsProps {
  onClose: () => void;
}

interface Artwork {
  id: number;
  title: string;
  artist: string;
  price: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  image: string;
  animation?: string;
  description: string;
  traits: { [key: string]: string };
  likes: number;
  views: number;
  owned: boolean;
  edition: string;
  minted: string;
  blockchain: string;
  contract: string;
  tokenId: string;
  royalties: number;
  history: Array<{
    event: string;
    price?: number;
    from?: string;
    to?: string;
    date: string;
  }>;
}

export const NeonDreamsDemo: React.FC<NeonDreamsProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'gallery' | 'artwork' | 'collection' | 'artist'>('gallery');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filterRarity, setFilterRarity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [likedArtworks, setLikedArtworks] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const artworks: Artwork[] = [
    {
      id: 1,
      title: "Cyber Genesis",
      artist: "NeonMaster",
      price: 2.5,
      rarity: "Legendary",
      image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "The birth of digital consciousness in a neon-soaked metropolis. This piece explores the intersection of humanity and technology through vibrant cyberpunk aesthetics.",
      traits: {
        "Background": "Neon City",
        "Style": "Cyberpunk",
        "Rarity": "Legendary",
        "Animation": "Yes",
        "Sound": "Ambient"
      },
      likes: 1247,
      views: 8934,
      owned: false,
      edition: "1/1",
      minted: "2024-01-15",
      blockchain: "Ethereum",
      contract: "0x1234...5678",
      tokenId: "001",
      royalties: 10,
      history: [
        { event: "Minted", from: "Creator", to: "NeonMaster", date: "2024-01-15" },
        { event: "Listed", price: 2.5, date: "2024-01-15" }
      ]
    },
    {
      id: 2,
      title: "Digital Samurai",
      artist: "CyberArt",
      price: 1.8,
      rarity: "Epic",
      image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Ancient warrior code meets futuristic technology in this stunning digital masterpiece. A fusion of traditional honor and cybernetic enhancement.",
      traits: {
        "Background": "Temple",
        "Style": "Futuristic",
        "Rarity": "Epic",
        "Animation": "Yes",
        "Weapon": "Laser Katana"
      },
      likes: 892,
      views: 5621,
      owned: true,
      edition: "5/10",
      minted: "2024-01-12",
      blockchain: "Ethereum",
      contract: "0x1234...5678",
      tokenId: "002",
      royalties: 7.5,
      history: [
        { event: "Minted", from: "Creator", to: "CyberArt", date: "2024-01-12" },
        { event: "Sold", price: 1.2, from: "CyberArt", to: "Collector1", date: "2024-01-13" },
        { event: "Sold", price: 1.8, from: "Collector1", to: "You", date: "2024-01-14" }
      ]
    },
    {
      id: 3,
      title: "Neon Butterfly",
      artist: "DigitalDreamer",
      price: 0.8,
      rarity: "Rare",
      image: "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Nature reimagined through the lens of digital transformation and neon aesthetics. A delicate creature of light and code.",
      traits: {
        "Background": "Digital Forest",
        "Style": "Nature-Tech",
        "Rarity": "Rare",
        "Animation": "Flutter",
        "Colors": "Rainbow Neon"
      },
      likes: 634,
      views: 3421,
      owned: false,
      edition: "12/25",
      minted: "2024-01-10",
      blockchain: "Ethereum",
      contract: "0x1234...5678",
      tokenId: "003",
      royalties: 5,
      history: [
        { event: "Minted", from: "Creator", to: "DigitalDreamer", date: "2024-01-10" },
        { event: "Listed", price: 0.8, date: "2024-01-10" }
      ]
    },
    {
      id: 4,
      title: "Quantum Portal",
      artist: "VoidArtist",
      price: 3.2,
      rarity: "Legendary",
      image: "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "A gateway between dimensions, rendered in stunning detail with particle effects and cosmic energy. Step through to the digital realm.",
      traits: {
        "Background": "Quantum Space",
        "Style": "Cosmic",
        "Rarity": "Legendary",
        "Animation": "Portal",
        "Energy": "Quantum"
      },
      likes: 1543,
      views: 12456,
      owned: false,
      edition: "1/3",
      minted: "2024-01-08",
      blockchain: "Ethereum",
      contract: "0x1234...5678",
      tokenId: "004",
      royalties: 12.5,
      history: [
        { event: "Minted", from: "Creator", to: "VoidArtist", date: "2024-01-08" },
        { event: "Listed", price: 3.2, date: "2024-01-08" }
      ]
    },
    {
      id: 5,
      title: "Chrome Dreams",
      artist: "MetalMind",
      price: 1.2,
      rarity: "Epic",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Reflective surfaces and chrome textures create a mesmerizing visual experience. The future is bright, metallic, and electric.",
      traits: {
        "Background": "Industrial",
        "Style": "Chrome",
        "Rarity": "Epic",
        "Animation": "Reflection",
        "Material": "Liquid Metal"
      },
      likes: 756,
      views: 4892,
      owned: false,
      edition: "8/15",
      minted: "2024-01-05",
      blockchain: "Ethereum",
      contract: "0x1234...5678",
      tokenId: "005",
      royalties: 8,
      history: [
        { event: "Minted", from: "Creator", to: "MetalMind", date: "2024-01-05" },
        { event: "Listed", price: 1.2, date: "2024-01-05" }
      ]
    },
    {
      id: 6,
      title: "Electric Soul",
      artist: "SoulCoder",
      price: 0.6,
      rarity: "Rare",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "The essence of human consciousness translated into electric patterns and neural networks. Where mind meets machine.",
      traits: {
        "Background": "Neural Network",
        "Style": "Abstract Tech",
        "Rarity": "Rare",
        "Animation": "Pulse",
        "Pattern": "Neural"
      },
      likes: 423,
      views: 2156,
      owned: false,
      edition: "18/30",
      minted: "2024-01-03",
      blockchain: "Ethereum",
      contract: "0x1234...5678",
      tokenId: "006",
      royalties: 6,
      history: [
        { event: "Minted", from: "Creator", to: "SoulCoder", date: "2024-01-03" },
        { event: "Listed", price: 0.6, date: "2024-01-03" }
      ]
    }
  ];

  const rarityColors = {
    'Common': 'from-gray-500 to-gray-600',
    'Rare': 'from-blue-500 to-blue-600',
    'Epic': 'from-purple-500 to-purple-600',
    'Legendary': 'from-yellow-500 to-orange-500'
  };

  const rarityIcons = {
    'Common': Circle,
    'Rare': Diamond,
    'Epic': Hexagon,
    'Legendary': Crown
  };

  const filteredArtworks = artworks.filter(artwork => {
    const matchesRarity = filterRarity === 'All' || artwork.rarity === filterRarity;
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRarity && matchesSearch;
  });

  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    switch (sortBy) {
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'popular':
        return b.likes - a.likes;
      case 'newest':
      default:
        return new Date(b.minted).getTime() - new Date(a.minted).getTime();
    }
  });

  const handleLike = (artworkId: number) => {
    setLikedArtworks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artworkId)) {
        newSet.delete(artworkId);
      } else {
        newSet.add(artworkId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const ArtworkCard: React.FC<{ artwork: Artwork; index: number }> = ({ artwork, index }) => {
    const RarityIcon = rarityIcons[artwork.rarity];
    
    return (
      <div 
        className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer"
        style={{ 
          animationDelay: `${index * 100}ms`,
          transform: `translateY(${scrollY * 0.1}px)`
        }}
        onClick={() => {
          setSelectedArtwork(artwork);
          setCurrentView('artwork');
        }}
      >
        <div className="relative overflow-hidden">
          <img 
            src={artwork.image} 
            alt={artwork.title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Animated overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Rarity badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${rarityColors[artwork.rarity]} rounded-full flex items-center gap-2`}>
            <RarityIcon className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">{artwork.rarity}</span>
          </div>
          
          {/* Owned badge */}
          {artwork.owned && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm font-medium">Owned</span>
            </div>
          )}
          
          {/* Hover actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(artwork.id);
                }}
                className="p-3 bg-red-500/80 backdrop-blur-sm rounded-full text-white hover:bg-red-500 transition-colors"
              >
                <Heart className={`w-5 h-5 ${likedArtworks.has(artwork.id) ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 bg-cyan-500/80 backdrop-blur-sm rounded-full text-white hover:bg-cyan-500 transition-colors">
                <Eye className="w-5 h-5" />
              </button>
              <button className="p-3 bg-purple-500/80 backdrop-blur-sm rounded-full text-white hover:bg-purple-500 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
              {artwork.title}
            </h3>
            <span className="text-cyan-400 font-mono text-sm">{artwork.edition}</span>
          </div>
          
          <p className="text-gray-400 text-sm mb-4">by {artwork.artist}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {artwork.likes + (likedArtworks.has(artwork.id) ? 1 : 0)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {artwork.views}
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{artwork.price} ETH</p>
              <p className="text-sm text-gray-400">${(artwork.price * 2400).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ArtworkDetail: React.FC = () => {
    if (!selectedArtwork) return null;

    const RarityIcon = rarityIcons[selectedArtwork.rarity];

    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentView('gallery')}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Gallery
              </button>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleLike(selectedArtwork.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${likedArtworks.has(selectedArtwork.id) ? 'fill-current' : ''}`} />
                  {selectedArtwork.likes + (likedArtworks.has(selectedArtwork.id) ? 1 : 0)}
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Artwork Display */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-gray-800">
                <img 
                  src={selectedArtwork.image} 
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Animation controls */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                {/* Rarity indicator */}
                <div className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${rarityColors[selectedArtwork.rarity]} rounded-full flex items-center gap-2`}>
                  <RarityIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{selectedArtwork.rarity}</span>
                </div>
              </div>

              {/* Traits */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Traits</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedArtwork.traits).map(([key, value]) => (
                    <div key={key} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <p className="text-gray-400 text-sm">{key}</p>
                      <p className="text-white font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Artwork Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl font-bold text-white">{selectedArtwork.title}</h1>
                  {selectedArtwork.owned && (
                    <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">
                      Owned
                    </span>
                  )}
                </div>
                
                <p className="text-xl text-gray-300 mb-6">by {selectedArtwork.artist}</p>
                
                <p className="text-gray-300 leading-relaxed mb-8">{selectedArtwork.description}</p>
                
                <div className="flex items-center gap-6 mb-8">
                  <div>
                    <p className="text-gray-400 text-sm">Current Price</p>
                    <p className="text-3xl font-bold text-white">{selectedArtwork.price} ETH</p>
                    <p className="text-gray-400">${(selectedArtwork.price * 2400).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Edition</p>
                    <p className="text-xl font-bold text-cyan-400">{selectedArtwork.edition}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {!selectedArtwork.owned ? (
                  <>
                    <button 
                      onClick={() => setShowWalletModal(true)}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Buy Now
                    </button>
                    <button className="px-6 py-4 border-2 border-cyan-500 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-500/10 transition-colors flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Make Offer
                    </button>
                  </>
                ) : (
                  <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Transfer
                  </button>
                )}
              </div>

              {/* Details */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract Address</span>
                    <button 
                      onClick={() => copyToClipboard(selectedArtwork.contract)}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span className="font-mono">{selectedArtwork.contract}</span>
                      {copiedAddress ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token ID</span>
                    <span className="text-white font-mono">{selectedArtwork.tokenId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Blockchain</span>
                    <span className="text-white">{selectedArtwork.blockchain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Royalties</span>
                    <span className="text-white">{selectedArtwork.royalties}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Minted</span>
                    <span className="text-white">{new Date(selectedArtwork.minted).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Transaction History</h3>
                <div className="space-y-4">
                  {selectedArtwork.history.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{event.event}</p>
                        <p className="text-gray-400 text-sm">{event.date}</p>
                      </div>
                      <div className="text-right">
                        {event.price && (
                          <p className="text-cyan-400 font-bold">{event.price} ETH</p>
                        )}
                        {event.from && event.to && (
                          <p className="text-gray-400 text-sm">{event.from} → {event.to}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${currentView === 'artwork' ? 1.5 : 1})`
        }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          ></div>
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 h-screen overflow-y-auto">
        {currentView === 'gallery' && (
          <>
            {/* Header */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <button 
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Neon Dreams Collection
                      </h1>
                      <p className="text-gray-400">50 unique digital artworks</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShowWalletModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    >
                      <Wallet className="w-5 h-5" />
                      Connect Wallet
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="relative py-20 px-6 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Digital Dreams
                  </span>
                  <br />
                  <span className="text-white">Come to Life</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Explore a cyberpunk universe where art meets technology. Each piece tells a story of digital transformation and neon-soaked futures.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">50</p>
                    <p className="text-gray-400">Unique Artworks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">12.5K</p>
                    <p className="text-gray-400">Total Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-pink-400">2.8K</p>
                    <p className="text-gray-400">Collectors</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search artworks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    />
                  </div>
                  
                  <select
                    value={filterRarity}
                    onChange={(e) => setFilterRarity(e.target.value)}
                    className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  >
                    <option value="All">All Rarities</option>
                    <option value="Common">Common</option>
                    <option value="Rare">Rare</option>
                    <option value="Epic">Epic</option>
                    <option value="Legendary">Legendary</option>
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-8">
                <span>{sortedArtworks.length} artworks found</span>
                <div className="flex items-center gap-4">
                  <span>Floor: 0.6 ETH</span>
                  <span>Volume: 45.2 ETH</span>
                  <span>Owners: 1.2K</span>
                </div>
              </div>
            </div>

            {/* Artworks Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
                {sortedArtworks.map((artwork, index) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
                ))}
              </div>
            </div>
          </>
        )}

        {currentView === 'artwork' && <ArtworkDetail />}
      </div>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Connect Wallet</h3>
              <button 
                onClick={() => setShowWalletModal(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">MetaMask</p>
                  <p className="text-gray-400 text-sm">Connect using browser wallet</p>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">WalletConnect</p>
                  <p className="text-gray-400 text-sm">Connect using mobile wallet</p>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Coinbase Wallet</p>
                  <p className="text-gray-400 text-sm">Connect using Coinbase</p>
                </div>
              </button>
            </div>
            
            <p className="text-gray-400 text-sm text-center mt-6">
              By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};