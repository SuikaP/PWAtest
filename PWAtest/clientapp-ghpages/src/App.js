import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plane, Train, Car, MapPin, Coffee, Camera,
    ShoppingBag, Sun, Moon, Users, ArrowRight,
    Utensils, Navigation, ChevronLeft, ChevronRight,
    ExternalLink, Flower2, Map, Bike, ChevronDown
} from 'lucide-react';

// --- Helper: Yahoo Transit URL Generator ---
// 格式: https://transit.yahoo.co.jp/search/result?from={FROM}&to={TO}
const getTransitUrl = (from, to) => {
    return `https://transit.yahoo.co.jp/search/result?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
};

// --- Data: Full Itinerary ---
const itineraryData = [
    {
        date: "12/25",
        day: "週四",
        title: "東京降落・晴空塔",
        transport: "public",
        // Warm sunset Skytree/Cityscape
        bgImage: "https://images.unsplash.com/photo-1553525577-44ee633b8dc5?auto=format&fit=crop&w=1200&q=80",
        schedule: [
            { time: "09:10", label: "松山機場 (TSA) 出發", icon: <Plane className="w-3 h-3" />, type: "transit" },
            { time: "13:00", label: "羽田機場 (HND) 抵達", icon: <MapPin className="w-3 h-3" />, type: "spot" },
            {
                time: "Move",
                label: "羽田機場 → 龜戶住處",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("羽田空港", "亀戸"),
                note: "有空可購買JR 東京都市地區周遊券"
            },
            { time: "Check-in", label: "龜戶住處 (5-chōme-21-2 Kameido)", icon: <MapPin className="w-3 h-3" />, type: "spot" },
            {
                time: "Move",
                label: "龜戶 → 晴空塔",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("亀戸", "押上"),
                note: "*押上站機台取東京地鐵三日券"
            },
            { time: "Dinner", label: "Toriton 迴轉壽司 (晴空街道店)", icon: <Utensils className="w-3 h-3" />, type: "food" },
            {
                time: "Activity",
                label: "墨田水族館 (抽號碼牌後先逛)",
                icon: <Users className="w-3 h-3" />,
                type: "spot",
                note: "墨田水族館直以QR code進場"
            },
            {
                time: "Night",
                label: "晴空塔展望台",
                icon: <Moon className="w-3 h-3" />,
                type: "spot",
                note: "4F晴空塔售票櫃台兌換觀景台門票"
            },
            {
                time: "Return",
                label: "晴空塔 → 龜戶住處",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("押上", "亀戸")
            }
        ]
    },
    {
        date: "12/26",
        day: "週五",
        title: "新宿・代官山・六本木",
        transport: "public",
        // Warm cafe/street vibe
        bgImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92a8fa?auto=format&fit=crop&w=1200&q=80",
        splitGroups: [
            {
                name: "📸 踩點組",
                items: ["龜戶住處 → 新宿御苑星巴克", "新宿御苑前站", "世界堂", "北村相機店"],
                actions: [
                    {
                        label: "龜戶→新宿御苑",
                        type: "yahoo",
                        from: "亀戸",
                        to: "千駄ケ谷"
                    },
                    {
                        label: "千駄ケ谷→北村 步行導航",
                        type: "google",
                        // Origin: Sendagaya Station, Waypoints: Starbucks -> Station -> Sekaido, Dest: Kitamura
                        url: "https://www.google.com/maps/dir/?api=1&origin=Sendagaya+Station&destination=Kitamura+Camera+Shinjuku&waypoints=Starbucks+Coffee+Shinjuku+Gyoen%7CShinjuku-gyoemmae+Station%7CSekaido+Shinjuku+Main+Store&travelmode=walking"
                    }
                ]
            },
            {
                name: "🛍️ 逛街組",
                items: ["龜戶住處 → 新宿", "新宿JR南口 3Coins", "Yodobashi 新宿西口", "BicCamera 新宿東口", "北村相機店"],
                actions: [
                    {
                        label: "龜戶→新宿",
                        type: "yahoo",
                        from: "亀戸",
                        to: "新宿"
                    },
                    {
                        label: "新宿逛街地圖",
                        type: "google",
                        // Origin: 3COINS (Lumine), Waypoints: Yodobashi West -> Bic East, Dest: Kitamura
                        url: "https://www.google.com/maps/dir/?api=1&origin=3COINS+Lumine+Shinjuku&destination=Kitamura+Camera+Shinjuku&waypoints=Yodobashi+Camera+Shinjuku+West%7CBicCamera+Shinjuku+East&travelmode=walking"
                    }
                ]
            }
        ],
        schedule: [
            {
                time: "Meet",
                label: "北村相機店會合",
                icon: <Users className="w-3 h-3" />,
                type: "spot",
                googleMapUrl: "https://www.google.com/maps/dir/?api=1&origin=Kitamura+Camera+Shinjuku&destination=Shinjuku-sanchome+Station&waypoints=Menya+Kaijin+Shinjuku&travelmode=walking"
            },
            { time: "Lunch", label: "麺屋 海神 新宿店", icon: <Utensils className="w-3 h-3" />, type: "food" },
            {
                time: "Walk",
                label: "步行 → 新宿三丁目車站",
                icon: <Navigation className="w-3 h-3" />,
                type: "transit"
            },
            {
                time: "Move",
                label: "新宿三丁目車站 → 代官山車站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("新宿三丁目", "代官山")
            },
            {
                time: "Shop", label: "代官山散策", icon: <ShoppingBag className="w-3 h-3" />, type: "spot",
                details: ["Le Labo", "MUJI", "NUMBER SUGAR", "蔦屋書店", "Green Bean to Bar Chocolate"],
                googleMapUrl: "https://www.google.com/maps/dir/?api=1&origin=Daikanyama+Station&destination=Mametora+Nakameguro&waypoints=Le+Labo+Daikanyama%7CNUMBER+SUGAR+Daikanyama%7CDaikanyama+T-Site%7Cgreen+bean+to+bar+CHOCOLATE+2-16-11+Aobadai+Meguro%7CStarbucks+Reserve+Roastery+Tokyo%7CFukusaya+Meguro%7Cflour%2Bwater+Nakameguro%7CTraveler's+Factory+Nakameguro&travelmode=walking"
            },
            { time: "Walk", label: "步行 → 中目黑", icon: <Navigation className="w-3 h-3" />, type: "transit" },
            {
                time: "Coffee", label: "中目黑散策", icon: <Coffee className="w-3 h-3" />, type: "spot",
                details: ["中目黑星巴克", "福砂屋", "flour＋water", "Traveler’s Factory", "豆虎 焙煎所"]
            },
            { time: "Walk", label: "步行 → 中目黑車站", icon: <Navigation className="w-3 h-3" />, type: "transit" },
            {
                time: "Move",
                label: "中目黑車站 → 六本木車站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("中目黒", "六本木")
            },
            {
                time: "Night",
                label: "六本木中城觀景台",
                icon: <Moon className="w-3 h-3" />,
                type: "spot",
                note: "Klook購票 16:00入場 於3F櫃台換票(另有福音戰士展覽)"
            },
            { time: "Dinner", label: "豚組食堂", icon: <Utensils className="w-3 h-3" />, type: "food" },
            {
                time: "Task",
                label: "富士軟片廣場",
                icon: <Camera className="w-3 h-3" />,
                type: "spot",
                note: "如果有買富士的相機，需到此處灌中文頁面 營業時間10-19",
                customTextColor: "text-emerald-600"
            },
            {
                time: "Return",
                label: "六本木 → 龜戶住處",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("六本木", "亀戸")
            }
        ]
    },
    {
        date: "12/27",
        day: "週六",
        title: "皇居・銀座・東京灣",
        transport: "public",
        // Tokyo Tower Sunset Warm
        bgImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
        schedule: [
            {
                time: "Move",
                label: "龜戶住處 → 大手町車站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("亀戸", "大手町")
            },
            {
                time: "Walk",
                label: "步行 → 皇居大手仮休憩所",
                icon: <Navigation className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/GwcUcZ3i8XDpU92q7",
                note: "若人很多可以前往另一個本丸休憩所"
            },
            {
                time: "Shop", label: "東京車站 / 銀座", icon: <ShoppingBag className="w-3 h-3" />, type: "spot",
                details: ["Traveler’s Factory 東京車站店", "東京站一番街", "銀座 Loft", "Muji 銀座", "銀座木村家", "CHOCOLATIER PALET D'OR", "10FACTORY", "GINZA SIX", "銀座 蔦屋書店"],
                googleMapUrl: "https://maps.app.goo.gl/D8PhfnFqXrJAMCjE7"
            },
            { time: "Lunch", label: "挽肉屋 神徳", icon: <Utensils className="w-3 h-3" />, type: "food" },
            { time: "Walk", label: "步行 → 東銀座車站", icon: <Navigation className="w-3 h-3" />, type: "transit" },
            {
                time: "Move",
                label: "東銀座車站 → 神谷町車站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("東銀座", "神谷町")
            },
            {
                time: "Visit",
                label: "麻布台之丘 & 東京鐵塔",
                icon: <Camera className="w-3 h-3" />,
                type: "spot",
                googleMapUrl: "https://maps.app.goo.gl/Dee6mWACe6efixHT8",
                note: "於33F或34F的咖啡廳或餐廳消費後加上JP 500才可入場，最推薦34FSky Room Cafe & Bar消費，飲料最低800日圓"
            },
            {
                time: "Move",
                label: "赤羽橋車站 → 濱松町車站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("赤羽橋", "浜松町")
            },
            {
                time: "Move",
                label: "濱松町車站 → 櫻木町車站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("浜松町", "桜木町")
            },
            {
                time: "Visit",
                label: "橫濱地標大廈 + 日本丸",
                icon: <MapPin className="w-3 h-3" />,
                type: "spot",
                googleMapUrl: "https://maps.app.goo.gl/MvbR1zNMFgqZPEwc7"
            },
            {
                time: "Dinner",
                label: "SHOGUN BURGER 橫濱紅磚倉庫店",
                icon: <Utensils className="w-3 h-3" />,
                type: "food",
                note: "2號館較多店可以逛，1號館只有1F有店家，2.3F為展演場地"
            },
            { time: "Cruise", label: "東京灣夜景遊船 (17:15報到)", icon: <Moon className="w-3 h-3" />, type: "spot" },
            { time: "Move", label: "橫濱搭船 → 竹芝車站", icon: <Train className="w-3 h-3" />, type: "transit" },
            {
                time: "Move",
                label: "竹芝車站 → 東京車站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("竹芝", "東京")
            },
            { time: "Night", label: "東京車站點燈", icon: <Camera className="w-3 h-3" />, type: "spot" },
            {
                time: "Return",
                label: "東京車站 → 龜戶住處",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("東京", "亀戸")
            }
        ]
    },
    {
        date: "12/28",
        day: "週日",
        title: "哈利波特・新宿・中野",
        transport: "public",
        // Warm interior / Magic vibe
        bgImage: "https://images.unsplash.com/photo-1551636898-47668aa61de2?auto=format&fit=crop&w=1200&q=80",
        splitAtBottom: true,
        schedule: [
            {
                time: "Move",
                label: "龜戶住處 → 豊島園車站(西武線)",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("亀戸", "豊島園")
            },
            {
                time: "09:30",
                label: "哈利波特影城",
                icon: <MapPin className="w-3 h-3" />,
                type: "spot",
                note: "入場時間9:30 可以提前一小時入場"
            },
            {
                time: "Coffee",
                label: "志村電機焙煎所",
                icon: <Coffee className="w-3 h-3" />,
                type: "food",
                note: "咖啡冰淇淋!"
            },
            {
                time: "Move",
                label: "豊島園車站(都營線) → 新宿車站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("豊島園", "新宿")
            },
            {
                time: "Lunch",
                label: "烤飛魚鹽拉麵 高橋 新宿本店",
                icon: <Utensils className="w-3 h-3" />,
                type: "food",
                googleMapUrl: "https://maps.app.goo.gl/vS5KB4CPaxAWCsqw8"
            },
            { time: "Play", label: "namco TOKYO & 歌舞伎町", icon: <Users className="w-3 h-3" />, type: "spot" },
            {
                time: "Shop",
                label: "LUMINE EST 新宿 & BEAMS JAPAN",
                icon: <ShoppingBag className="w-3 h-3" />,
                type: "spot",
                expandableDetails: "B2 Onitsuka Tiger、sholayered\nB1 shiro無人櫃點、Porter stand\n1F Onitsuka Tiger\n3F 3coins\n5F Gregory\n6F ABC mart"
            },
        ],
        splitGroups: [
            {
                name: "🏙️ 新宿續逛",
                // Modified Isetan item to be an object for expandability
                items: [
                    {
                        label: "伊勢丹",
                        details: "本館 B2 BAUM，B1清酒、noix de beurre費南雪、なか又銅鑼燒\n1F Shiro、JO MALONE、LE LABO、KITOWA，4F Canoma\n男館 1F ACQUA DI PARMA"
                    },
                    "Victoria Shinjuku(運動用品店)",
                    "L-Breath(露營用品店)",
                    "Alpen Tokyo(運動用品店)",
                    {
                        label: "京王百貨",
                        details: "1F Jo malone、Roaliv、ABC mart，4F Kipling，5F Columbia"
                    }
                ],
                actions: [
                    {
                        label: "新宿續逛地圖",
                        type: "google",
                        url: "https://maps.app.goo.gl/yGKwyyE83e4e4q4g7"
                    }
                ]
            },
            {
                name: "🎮 中野",
                items: [
                    {
                        label: "伊勢丹",
                        details: "本館 B2 BAUM，B1清酒、noix de beurre費南雪、なか又銅鑼燒\n1F Shiro、JO MALONE、LE LABO、KITOWA，4F Canoma\n男館 1F ACQUA DI PARMA"
                    },
                    {
                        label: "新宿丸井別館",
                        details: "5F 駿河屋，6F 萬代"
                    },
                    "中野百老匯"
                ],
                actions: [
                    {
                        label: "中野地圖",
                        type: "google",
                        url: "https://maps.app.goo.gl/JEsbnyqKsMUkmVGDA"
                    }
                ]
            }
        ],
        scheduleContinued: [
            {
                time: "Move",
                label: "新宿車站 → 中野車站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("新宿", "中野")
            },
            {
                time: "Dinner",
                label: "maguro mart",
                icon: <Utensils className="w-3 h-3" />,
                type: "food",
                note: "預約6:30"
            },
            {
                time: "Return",
                label: "中野車站 → 龜戶住處",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("中野", "亀戸")
            }
        ]
    },
    {
        date: "12/29",
        day: "週一",
        title: "淺草・荒川線・池袋",
        transport: "public",
        // Asakusa Lanterns Warm
        bgImage: "https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&w=1200&q=80",
        // Added splitAtBottom to move groups between schedule and scheduleContinued
        splitAtBottom: true,
        schedule: [
            {
                time: "Move",
                label: "龜戶住處 → 淺草站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("亀戸", "浅草")
            },
            {
                time: "Visit", label: "淺草寺 & 仲見世通", icon: <Sun className="w-3 h-3" />, type: "spot",
                details: ["Asakusa Unana", "壽々喜園", "栃木家商店", "淺草吉備糰子", "和泉屋", "淺草文化觀光中心"],
                googleMapUrl: "https://maps.app.goo.gl/oLWfdLvyqiA1Qjcz8"
            },
            {
                time: "Move",
                label: "淺草站 → 池袋站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("浅草", "池袋")
            },
        ],
        splitGroups: [
            {
                name: "🍩 池袋甜甜圈",
                items: [
                    "池袋站",
                    {
                        label: "LUMINE",
                        details: "B1 Shiro, 1F BEAMS，5F 3coins, 7F muji, AUX PARADIS"
                    },
                    "I'm donut?", "Animate", "BOOKOFF", "美久仁小路",
                    {
                        label: "池袋太陽城",
                        details: "Columbia, northface, 3 coin, merrell, muji, loft, workwomen"
                    }
                ],
                actions: [
                    {
                        label: "池袋甜甜圈地圖",
                        type: "google",
                        url: "https://maps.app.goo.gl/3cQBCJRCDozwJVUP7"
                    }
                ]
            },
            {
                name: "🍟 池袋百貨",
                items: [
                    "池袋站",
                    {
                        label: "LUMINE",
                        details: "B1 Shiro, 1F BEAMS，5F 3coins, 7F muji, AUX PARADIS"
                    },
                    {
                        label: "東武百貨",
                        details: "B1 and the friet(薯條)、9F Uniqlo, 5F montbell、gregory, 6F daiso, 2F換5%折扣券，11F Toriton"
                    },
                    {
                        label: "池袋太陽城",
                        details: "Columbia, northface, 3 coin, merrell, muji, loft, workwomen"
                    }
                ],
                actions: [
                    {
                        label: "池袋百貨地圖",
                        type: "google",
                        url: "https://maps.app.goo.gl/AToLcjMnpDaRPjcc6"
                    }
                ]
            }
        ],
        scheduleContinued: [
            { time: "Meet", label: "池袋太陽城會合", icon: <Users className="w-3 h-3" />, type: "spot" },
            {
                time: "Walk",
                label: "步行 → 東池袋四丁目站",
                icon: <Navigation className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/o3cvzo5uXcyapZ6Z6"
            },
            {
                time: "Photo",
                label: "都電荒川線 (東池袋四丁目 -> 大塚駅前)",
                icon: <Camera className="w-3 h-3" />,
                type: "spot",
                transitUrl: getTransitUrl("東池袋四丁目", "大塚駅前")
            },
            {
                time: "Move",
                label: "大塚駅前 → 秋葉原",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("大塚駅前", "秋葉原")
            },
            {
                time: "Split", label: "上野 vs 秋葉原 分頭行動", icon: <Users className="w-3 h-3" />, type: "spot",
                // Converted details to nestedSplitGroups
                nestedSplitGroups: [
                    {
                        name: "🐼 上野組",
                        items: ["Yamashiroya", "無印良品", "mont-bell", "多慶屋", "前往 三越前站"],
                        actions: [
                            {
                                label: "上野逛街地圖",
                                type: "google",
                                url: "https://maps.app.goo.gl/ybfGhYqxhCv8SJPu5"
                            }
                        ]
                    },
                    {
                        name: "🔌 秋葉原組",
                        items: ["秋葉原店家", "前往 三越前站"],
                        actions: [
                            {
                                label: "秋葉原地圖",
                                type: "google",
                                url: "https://maps.app.goo.gl/YKFUSXA3zVe61QkG9"
                            }
                        ]
                    }
                ]
            },
            {
                time: "Move",
                label: "上野站 → 三越前站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("上野", "三越前")
            },
            {
                time: "Dinner",
                label: "金子半之助 日本橋店 (三越前站)",
                icon: <Utensils className="w-3 h-3" />,
                type: "food",
                googleMapUrl: "https://maps.app.goo.gl/QdxxzvEvgyqjAR6X9"
            },
            {
                time: "Walk",
                label: "金子半之助 日本橋店 → 新日本橋站",
                icon: <Navigation className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/UU9Aeqa2RjrsA93d9"
            },
            {
                time: "Return",
                label: "新日本橋站 → 龜戶住處",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("新日本橋", "亀戸")
            }
        ]
    },
    {
        date: "12/30",
        day: "週二",
        title: "錦糸町・Comiket",
        transport: "public",
        // Warm Odaiba Sunset
        bgImage: "https://images.unsplash.com/photo-1549693578-d683be211e58?auto=format&fit=crop&w=1200&q=80",
        splitGroups: [
            {
                name: "☕ 龜戶組",
                items: [
                    {
                        label: "猿田彥咖啡",
                        details: "LIFE Kameido Clock、コジマ×ビックカメラ KAMEIDO CLOCK店、はせがわ酒店 カメイドクロック店、UNIQLO、Alpen"
                    },
                    "龜戶站",
                    "錦糸町站",
                    "Donki 錦糸町",
                    {
                        label: "ARCAKIT",
                        details: "B1 LIFE超市，3F Workman Girl, 3coins， 4F Uniqulo，6F GU, Muji, ABC mart，7F Daiso"
                    },
                    {
                        label: "錦糸町PARCO",
                        details: "4F Muji，5F C#pla，6F Loft"
                    }
                ],
                actions: [
                    {
                        label: "猿田彥咖啡",
                        type: "google",
                        url: "https://maps.app.goo.gl/94DmswzLRCyapxV38"
                    },
                    {
                        label: "Donki 錦糸町",
                        type: "google",
                        url: "https://maps.app.goo.gl/cGUPVUbEsMkNPDkx5"
                    }
                ]
            },
            {
                name: "🚲 有明組",
                items: ["龜戶站", "Small World Tokyo (9:00開館)"],
                actions: [
                    {
                        label: "有明騎行地圖",
                        type: "bike",
                        url: "https://maps.app.goo.gl/qCdsdrAVQD3mA2d7A"
                    }
                ]
            }
        ],
        schedule: [
            {
                time: "Lunch",
                label: "集合：市場前站 (つきぢ神楽寿司 豊洲市場店)",
                icon: <Utensils className="w-3 h-3" />,
                type: "food",
                googleMapUrl: "https://maps.app.goo.gl/hBDtFPGNrPXQ9Rrq6",
                mapButtonColor: "blue"
            },
            {
                time: "Split", label: "下午分頭行動", icon: <Users className="w-3 h-3" />, type: "spot",
                nestedSplitGroups: [
                    {
                        name: "📚 Comiket組",
                        items: ["市場前站 → 東京ビッグサイト駅", "12:30入場"],
                        actions: [
                            {
                                label: "前往會場",
                                type: "yahoo",
                                from: "市場前",
                                to: "東京ビッグサイト"
                            }
                        ]
                    },
                    {
                        name: "🗽 台場組",
                        items: ["市場前站 → 台場站"],
                        actions: [
                            {
                                label: "前往台場",
                                type: "yahoo",
                                from: "市場前",
                                to: "台場"
                            }
                        ]
                    }
                ]
            },
            {
                time: "Shop",
                label: "台場逛街",
                icon: <ShoppingBag className="w-3 h-3" />,
                type: "spot",
                expandableDetails: "ダイバーシティ東京プラザ - 3F adidas，4F Nike，5F ABC mart、uniqulo，7F 鋼彈\nアクアシティ お台場 - 3F anitatchi(動物接觸)、Onitsuka Tiger、adidas、Columbia、c#pla、puma、new balance、Levis\nデックス東京ビーチ - 3F C#pla、ABC mart，4F Daiso，5F wild-1"
            },
            {
                time: "Move",
                label: "前往 新橋站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("台場", "新橋")
            },
            { time: "Dinner", label: "カリカル (Carical) 新橋本店", icon: <Utensils className="w-3 h-3" />, type: "food" },
            {
                time: "Return",
                label: "新橋站 → 龜戶住處",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("新橋", "亀戸")
            }
        ]
    },
    {
        date: "12/31",
        day: "週三",
        title: "湘南海岸・取車",
        transport: "mix",
        // Warm Enoden/Sea
        bgImage: "https://images.unsplash.com/photo-1565545229671-6c2306771343?auto=format&fit=crop&w=1200&q=80",
        schedule: [
            {
                time: "Move",
                label: "龜戶住處 → 七里之濱站",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("亀戸", "七里ヶ浜")
            },
            { time: "Photo", label: "七里之濱", icon: <Camera className="w-3 h-3" />, type: "spot" },
            {
                time: "Move",
                label: "七里之濱站 → 江之島",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("七里ヶ浜", "江ノ島")
            },
            {
                time: "Eat",
                label: "Enoshima Pudding",
                icon: <Coffee className="w-3 h-3" />,
                type: "food",
                googleMapUrl: "https://maps.app.goo.gl/sFXk7mi2gBfFuF5DA"
            },
            { time: "Visit", label: "片瀨江之島車站 & 水族館", icon: <MapPin className="w-3 h-3" />, type: "spot" },
            { time: "Lunch", label: "蕎麦 よしふく", icon: <Utensils className="w-3 h-3" />, type: "food" },
            {
                time: "Walk",
                label: "江之島 →湘南江之島站",
                icon: <Navigation className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/uPRiChiZtdjh9uUn7",
                expandableDetails: "江之島商店街、富士見濱、江之島蠟燭"
            },
            {
                time: "Move",
                label: "湘南江之島站 → 上野 (Ramen Aidaya2)",
                icon: <Train className="w-3 h-3" />,
                type: "transit",
                transitUrl: getTransitUrl("湘南江の島", "上野")
            },
            {
                time: "Walk",
                label: "步行 → 日産レンタカー 上野駅前店",
                icon: <Navigation className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/QKPupor5WbtUnaso7"
            },
            { time: "RENTAL", label: "🚗 取車啟動", icon: <Car className="w-3 h-3" />, type: "spot" },
            {
                time: "Drive",
                label: "上野 → 龜戶住處 (開車)",
                icon: <Car className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/TqHp7v3sHAotGFH38",
                mapButtonColor: "amber"
            },
        ]
    },
    {
        date: "01/01",
        day: "週四",
        title: "元旦日出・富士山",
        transport: "car",
        // Warm Sunrise Fuji
        bgImage: "https://images.unsplash.com/photo-1589218443907-742a77a94425?auto=format&fit=crop&w=1200&q=80",
        schedule: [
            {
                time: "05:30",
                label: "Shibuya Sky 新年日出",
                icon: <Sun className="w-3 h-3" />,
                type: "spot",
                googleMapUrl: "https://maps.app.goo.gl/oKjNmEhJnSxEVXRy7",
                mapButtonColor: "amber",
                note: "約5:30開始進場⇒7:30左右退場"
            },
            {
                time: "Drive",
                label: "Shibuya Sky → 笹一酒造",
                icon: <Car className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/PFSmTRqSSuCgLxRGA",
                mapButtonColor: "amber"
            },
            {
                time: "Lunch",
                label: "笹一酒造 → Hoshizora Kitchen ほし空キッチン",
                icon: <Utensils className="w-3 h-3" />,
                type: "food",
                googleMapUrl: "https://maps.app.goo.gl/obugdtBjRXqPqdpk6",
                mapButtonColor: "amber"
            },
            {
                time: "Drive",
                label: "前往 北口本宮富士淺間神社",
                icon: <Car className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/feoREudynyYiBgCbA",
                mapButtonColor: "amber"
            },
            { time: "Visit", label: "富士山レーダードーム館", icon: <Camera className="w-3 h-3" />, type: "spot" },
            { time: "Drive", label: "山中湖巡禮 (白鳥浜/長池/平野/夕焼けの渚)", icon: <Car className="w-3 h-3" />, type: "transit" },
            { time: "Dinner", label: "甲州ほうとう小作 山中湖店", icon: <Utensils className="w-3 h-3" />, type: "food" },
            {
                time: "Drive",
                label: "前往住宿：Megu Fuji 2021",
                icon: <Car className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/33H5QdZ6beQ2HmqC8",
                mapButtonColor: "amber"
            }
        ]
    },
    {
        date: "01/02",
        day: "週五",
        title: "富士五湖・山梨夜景",
        transport: "car",
        // Warm Chureito
        bgImage: "https://images.unsplash.com/photo-1528695079634-190393b44b61?auto=format&fit=crop&w=1200&q=80",
        schedule: [
            { time: "Morning", label: "富士山站 (站內展望台) & 早餐", icon: <MapPin className="w-3 h-3" />, type: "spot" },
            {
                time: "Drive",
                label: "前往 本栖湖 (千円札富士)",
                icon: <Car className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/exD3qdSTtDJBGzt78",
                mapButtonColor: "amber"
            },
            {
                time: "Spot",
                label: "山田屋ホテル前 / 湖畔荘",
                icon: <Camera className="w-3 h-3" />,
                type: "spot",
                googleMapUrl: "https://maps.app.goo.gl/uonTX4BhwigoYxtx9",
                mapButtonColor: "amber"
            },
            { time: "Drive", label: "前往 西湖 (根場浜 / 露營場)", icon: <Car className="w-3 h-3" />, type: "transit" },
            { time: "View", label: "扇崎展望點", icon: <Camera className="w-3 h-3" />, type: "spot" },
            { time: "Stop", label: "FUJIYAMA COOKIE & お惣菜の店 ふるや", icon: <ShoppingBag className="w-3 h-3" />, type: "food" },
            { time: "Visit", label: "河口湖站 (布丁)", icon: <MapPin className="w-3 h-3" />, type: "spot" },
            {
                time: "Drive",
                label: "光與雲的展望台 → 產屋崎 → 旅之站",
                icon: <Car className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/vEuAXc4R8irv5ys36",
                mapButtonColor: "amber"
            },
            {
                time: "Shop",
                label: "旅之站 → 富士見橋 → 七賢（山梨銘醸株式会社）",
                icon: <ShoppingBag className="w-3 h-3" />,
                type: "spot",
                googleMapUrl: "https://maps.app.goo.gl/qz8inWuzpnN9W6Mz7",
                mapButtonColor: "amber"
            },
            {
                time: "Night",
                label: "山梨県立科学館展望デッキ (夜景)",
                icon: <Moon className="w-3 h-3" />,
                type: "spot",
                googleMapUrl: "https://maps.app.goo.gl/q18spbSGxDH2e89v5",
                mapButtonColor: "amber"
            },
            {
                time: "Return",
                label: "開車返回 龜戶住處",
                icon: <Car className="w-3 h-3" />,
                type: "transit",
                googleMapUrl: "https://maps.app.goo.gl/mRA7P4H4YAx5Cbyg8",
                mapButtonColor: "amber"
            }
        ]
    },
    {
        date: "01/03",
        day: "週六",
        title: "海螢火蟲・返台",
        transport: "car",
        // Warm Airplane window
        bgImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
        schedule: [
            { time: "Drive", label: "龜戶 → Umihotaru 海螢火蟲", icon: <Car className="w-3 h-3" />, type: "transit" },
            { time: "Suggest", label: "三井 Outlet Park 木更津", icon: <ShoppingBag className="w-3 h-3" />, type: "spot" },
            { time: "Drive", label: "前往 羽田機場還車 (日產)", icon: <Car className="w-3 h-3" />, type: "transit" },
            { time: "18:10", label: "JL099 羽田機場 (HND) 起飛", icon: <Plane className="w-3 h-3" />, type: "transit" },
            { time: "21:00", label: "抵達 台北松山機場 (TSA)", icon: <MapPin className="w-3 h-3" />, type: "spot" }
        ]
    }
];

// --- Sub-Components ---

// New Component for expandable items
const ExpandableItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center gap-1 hover:text-amber-600 transition-colors">
                {item.label}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="text-xs text-stone-500 mt-1 whitespace-pre-line pl-2 border-l-2 border-amber-200 ml-1 leading-relaxed">
                            {item.details}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TimelineItem = ({ item, isLast }) => {
    const isTransit = item.type === "transit";
    // Warm color palette update
    const iconColor = isTransit ? "text-stone-500" : "text-rose-500";
    const bgIcon = isTransit ? "bg-white/80" : "bg-white";
    const textColor = item.customTextColor || (isTransit ? "text-stone-600" : "text-stone-800");
    const borderColor = isTransit ? "border-stone-300" : "border-rose-300";

    return (
        <div className="relative pl-6 pb-5 last:pb-0 z-10">
            {!isLast && (
                <div className="absolute left-[11px] top-6 bottom-0 w-[1px] bg-stone-300/80" />
            )}
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border ${borderColor} ${bgIcon} ${iconColor} z-10 shadow-sm backdrop-blur-sm`}>
                {item.icon}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 group">
                <div className="w-14 shrink-0 pt-1.5">
                    <span className="text-xs font-mono text-stone-600 uppercase tracking-wider font-semibold">{item.time}</span>
                </div>
                <div className={`flex-1 p-3 rounded-xl transition-all hover:bg-white/60 -mt-1 -ml-2 sm:mt-0 sm:ml-0 backdrop-blur-[2px]`}>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className={`text-base font-bold ${textColor} leading-snug drop-shadow-sm`}>
                            {item.expandableDetails ? (
                                <ExpandableItem item={{ label: item.label, details: item.expandableDetails }} />
                            ) : (
                                    item.label
                                )}
                        </div>

                        {/* Yahoo Transit Link Button */}
                        {item.transitUrl && (
                            <a
                                href={item.transitUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100 transition-colors border shadow-sm"
                                title="開啟 Yahoo! 乘換案內"
                            >
                                <ExternalLink className="w-3 h-3" />
                地鐵
                            </a>
                        )}

                        {/* Google Map Link Button */}
                        {item.googleMapUrl && (
                            <a
                                href={item.googleMapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors border shadow-sm ${item.mapButtonColor === 'blue'
                                        ? "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100"
                                        : item.mapButtonColor === 'amber' // New variant for car
                                            ? "bg-white/80 text-amber-600 hover:bg-amber-50 border-amber-200"
                                            : "bg-white/80 text-green-600 hover:bg-green-50 border-green-200"
                                    }`}
                                title="開啟 Google Maps 路線"
                            >
                                {item.mapButtonColor === 'blue' ? <ExternalLink className="w-3 h-3" /> : item.mapButtonColor === 'amber' ? <Car className="w-3 h-3" /> : <Map className="w-3 h-3" />}
                                {item.mapButtonColor === 'blue' ? "地鐵" : item.mapButtonColor === 'amber' ? "開車" : "導航"}
                            </a>
                        )}
                    </div>

                    {item.note && (
                        <div className="text-xs text-stone-500 mt-1 font-medium">
                            {item.note}
                        </div>
                    )}

                    {item.details && (
                        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                            {item.details.map((detail, idx) => (
                                <span key={idx} className="text-[13px] text-stone-600 flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-md border border-stone-100 shadow-sm">
                                    {detail}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Nested Split Groups Rendering */}
                    {item.nestedSplitGroups && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {item.nestedSplitGroups.map((group, idx) => (
                                <div key={idx} className="bg-stone-50/80 border border-stone-200 rounded-lg p-2.5 flex flex-col h-full">
                                    <div className="text-xs font-bold text-amber-600 mb-1.5 flex items-center gap-1.5">
                                        <Users className="w-3 h-3" />
                                        {group.name}
                                    </div>
                                    <ul className="space-y-1 flex-1">
                                        {group.items.map((it, i) => (
                                            <li key={i} className="text-xs text-stone-600 pl-2 border-l-2 border-stone-300 leading-tight">
                                                {typeof it === 'string' ? it : <ExpandableItem item={it} />}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Render Nested Actions */}
                                    {group.actions && (
                                        <div className="mt-2 pt-2 border-t border-stone-200/50 flex flex-wrap gap-2">
                                            {group.actions.map((action, actionIdx) => (
                                                <a
                                                    key={actionIdx}
                                                    href={action.url || (action.type === 'yahoo' ? getTransitUrl(action.from, action.to) : '#')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center justify-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-colors border shadow-sm w-full ${action.type === 'yahoo'
                                                            ? 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' // UPDATED: Blue bg for Yahoo in nested
                                                            : 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' // Google Maps brand colorish
                                                        }`}
                                                >
                                                    {action.type === 'yahoo' ? <ExternalLink className="w-3 h-3" /> : <Map className="w-3 h-3" />}
                                                    {action.type === 'yahoo' ? '地鐵' : action.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SplitGroup = ({ groups }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 pl-6 relative z-10">
        {groups.map((group, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-md border border-stone-200/60 rounded-xl p-3 shadow-sm flex flex-col h-full">
                <div className="text-sm font-bold text-amber-600 mb-2 flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    {group.name}
                </div>
                <ul className="space-y-1 flex-1">
                    {group.items.map((item, i) => (
                        <li key={i} className="text-sm text-stone-600 pl-2 border-l-2 border-stone-300">
                            {typeof item === 'string' ? item : <ExpandableItem item={item} />}
                        </li>
                    ))}
                </ul>

                {/* Render Actions if present */}
                {group.actions && (
                    <div className="mt-3 pt-2 border-t border-stone-200/50 grid grid-cols-1 xs:grid-cols-2 gap-2">
                        {group.actions.map((action, actionIdx) => (
                            <a
                                key={actionIdx}
                                href={action.url || (action.type === 'yahoo' ? getTransitUrl(action.from, action.to) : '#')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors border shadow-sm ${group.actions.length === 1 ? 'xs:col-span-2' : ''
                                    } ${action.type === 'yahoo'
                                        ? 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' // UPDATED: Blue bg for Yahoo in SplitGroup
                                        : action.type === 'bike'
                                            ? 'bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-100' // Bike brand colorish
                                            : 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' // Google Maps brand colorish
                                    }`}
                            >
                                {action.type === 'yahoo' ? <ExternalLink className="w-3 h-3" /> : action.type === 'bike' ? <Bike className="w-3 h-3" /> : <Map className="w-3 h-3" />}
                                {action.type === 'yahoo' ? '地鐵' : action.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        ))}
    </div>
);

const DayTabs = ({ days, activeIndex, onChange }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            const activeEl = scrollRef.current.children[activeIndex];
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeIndex]);

    return (
        <div className="relative mb-4"> {/* Reduced bottom margin */}
            {/* Scrollable Area */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-2 py-2 px-1 relative z-10 scrollbar-hide no-scrollbar snap-x"
            >
                {days.map((day, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                        <button
                            key={idx}
                            onClick={() => onChange(idx)}
                            className={`relative shrink-0 px-4 py-2 rounded-xl transition-all duration-300 outline-none group snap-start min-w-[70px] border shadow-sm ${isActive ? 'border-orange-200' : 'border-stone-100 bg-white'}`}
                        >
                            {/* Active Background Animation */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-orange-50 rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}

                            {/* Text Content */}
                            <div className="relative z-10 flex flex-col items-center">
                                <span className={`text-[10px] font-mono mb-0.5 tracking-wider transition-colors ${isActive ? "text-orange-600 font-bold" : "text-stone-400 group-hover:text-stone-500"
                                    }`}>
                                    {day.date}
                                </span>
                                <span className={`text-sm font-bold transition-colors ${isActive ? "text-stone-800" : "text-stone-500 group-hover:text-stone-700"
                                    }`}>
                                    {day.day}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    )
};

const DayRow = ({ data }) => {
    // Logic to determine if split group goes to bottom
    const isSplitBottom = data.splitAtBottom;
    return (
        <motion.div
            key={data.date}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-4 relative min-h-[500px]" // Reduced gap
        >
            {/* Background Image with "Illustration" Filter */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                {/* Base Image */}
                <img
                    src={data.bgImage}
                    alt={data.title}
                    className="w-full h-full object-cover opacity-40 transition-opacity duration-700"
                    style={{
                        filter: 'sepia(40%) saturate(120%) contrast(85%) brightness(120%) blur(0.5px)',
                    }}
                />
                {/* Warm Overlay Blend - Multi-layer for "Japanese paper" feel */}
                <div className="absolute inset-0 bg-[#fff8f0] mix-blend-color" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/95" />
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-40 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Header Info */}
            <div className="relative z-10 flex flex-col gap-2 pb-3 border-b border-stone-200/60"> {/* Reduced padding */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight flex items-center gap-2 drop-shadow-sm">
                        <span className="text-orange-400 font-mono text-lg sm:text-xl">#{data.date}</span>
                        {data.title}
                    </h2>
                    {/* Transport Badge - Updated with Icons */}
                    <div className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full border shadow-sm flex items-center gap-1 ${data.transport === 'car'
                            ? 'border-amber-200 bg-amber-50 text-amber-600'
                            : data.transport === 'mix'
                                ? 'border-purple-200 bg-purple-50 text-purple-600'
                                : 'border-blue-200 bg-blue-50 text-blue-600'
                        }`}>
                        {/* Icons logic */}
                        {(data.transport === 'public' || data.transport === 'mix') && <Train className="w-3 h-3" />}
                        {(data.transport === 'car' || data.transport === 'mix') && <Car className="w-3 h-3" />}
                        {/* Bike icon for 12/30 */}
                        {data.date === "12/30" && <Bike className="w-3 h-3" />}

                        <span className="hidden sm:inline">{data.transport === 'car' ? 'DRIVE' : data.transport === 'mix' ? 'MIXED' : 'TRAIN'}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1">
                {/* Top Split Groups */}
                {data.splitGroups && !isSplitBottom && (
                    <SplitGroup groups={data.splitGroups} />
                )}

                {/* Timeline */}
                <div className="relative">
                    {data.schedule.map((item, idx) => (
                        <TimelineItem key={idx} item={item} isLast={idx === data.schedule.length - 1 && !data.scheduleContinued} />
                    ))}
                </div>

                {/* Bottom Split Groups */}
                {data.splitGroups && isSplitBottom && (
                    <div className="mt-4 relative">
                        <div className="absolute left-[11px] -top-6 h-6 w-[1px] bg-stone-300"></div>
                        <SplitGroup groups={data.splitGroups} />
                    </div>
                )}

                {/* Continued Schedule */}
                {data.scheduleContinued && (
                    <div className="relative mt-2">
                        <div className="absolute left-[11px] -top-4 h-4 w-[1px] bg-stone-300"></div>
                        {data.scheduleContinued.map((item, idx) => (
                            <TimelineItem key={idx} item={item} isLast={idx === data.scheduleContinued.length - 1} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// --- Main Component ---

export default function App() {
    const [activeDayIndex, setActiveDayIndex] = useState(0);

    const handleNext = () => {
        if (activeDayIndex < itineraryData.length - 1) {
            setActiveDayIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (activeDayIndex > 0) {
            setActiveDayIndex(prev => prev - 1);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfaf7] text-stone-600 font-sans selection:bg-orange-100 pb-20 font-rounded">

            {/* Injected Styles to hide scrollbar and add rounded font */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        
        .font-rounded {
          font-family: 'Zen Maru Gothic', sans-serif;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

            {/* Compact Hero - Warmer Style - Reduced Height for Mobile */}
            <header className="relative h-[20vh] min-h-[160px] flex flex-col justify-center px-6 overflow-hidden mb-6 bg-gradient-to-b from-stone-100 to-[#fcfaf7] border-b border-stone-200">
                <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/japanese-asanoha.png')] opacity-20"></div>

                {/* Composite Background Images */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Fuji - Left */}
                    <div className="absolute left-0 top-[-20%] w-2/3 h-[140%] bg-cover bg-no-repeat bg-right opacity-25 mix-blend-multiply filter sepia-[0.3]"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576675784201-0e142b423952?auto=format&fit=crop&w=800&q=80')" }}> {/* Using the Chureito Pagoda/Fuji image for composition */}
                    </div>
                    {/* Tokyo Tower - Right */}
                    <div className="absolute right-0 top-[-20%] w-2/3 h-[140%] bg-cover bg-no-repeat bg-left opacity-25 mix-blend-multiply filter sepia-[0.3]"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80')" }}>
                    </div>
                    {/* Blending Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#fcfaf7]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#fcfaf7] via-transparent to-[#fcfaf7]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto w-full">
                    <div className="flex items-center gap-2 text-rose-500 font-mono text-xs tracking-widest mb-1">
                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
             TRAVEL LOG
           </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-stone-800 tracking-tight mb-2 flex items-center gap-2 drop-shadow-sm">
                        TOKYO <span className="text-orange-400 font-light">/</span> FUJI
             <Flower2 className="w-5 h-5 sm:w-6 sm:h-6 text-rose-300 opacity-80" />
                    </h1>
                    <div className="flex items-center gap-4 text-stone-500 font-mono text-xs sm:text-sm">
                        <span>2025.12.25</span>
                        <ArrowRight className="w-3 h-3 text-stone-300" />
                        <span>2026.01.03</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-3 sm:px-6"> {/* Reduced side padding for mobile */}

                {/* Navigation Tabs */}
                <DayTabs
                    days={itineraryData}
                    activeIndex={activeDayIndex}
                    onChange={setActiveDayIndex}
                />

                {/* Day Content Area - Paper Style Container */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-100 p-3 sm:p-8 min-h-[500px] relative overflow-hidden shadow-lg shadow-stone-200/50">
                    <AnimatePresence mode="wait">
                        <DayRow data={itineraryData[activeDayIndex]} />
                    </AnimatePresence>
                </div>

                {/* Footer Navigation Controls */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-stone-200">
                    <button
                        onClick={handlePrev}
                        disabled={activeDayIndex === 0}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeDayIndex === 0
                                ? "opacity-30 cursor-not-allowed text-stone-400"
                                : "text-stone-500 hover:text-orange-500 hover:bg-orange-50"
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

                    <span className="text-xs font-mono text-stone-400">
                        PAGE {activeDayIndex + 1} / {itineraryData.length}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={activeDayIndex === itineraryData.length - 1}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeDayIndex === itineraryData.length - 1
                                ? "opacity-30 cursor-not-allowed text-stone-400"
                                : "text-stone-500 hover:text-orange-500 hover:bg-orange-50"
                            }`}
                    >
                        Next
            <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

            </main>
        </div>
    );
}