<template>
  <div class="space-y-6">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl text-white">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">আমাদের সম্পর্কে</h1>
        <p class="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
          তরকারাজী একটি সম্প্রদায়ভিত্তিক আর্থিক প্রতিষ্ঠান যা সদস্যদের সঞ্চয় ও বিনিয়োগে সহায়তা করে
        </p>
      </div>
    </div>

    <!-- Mission & Vision -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <i class="fas fa-bullseye text-purple-600 text-xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">আমাদের মিশন</h2>
        </div>
        <p class="text-gray-600 leading-relaxed">
          সদস্যদের আর্থিক সচ্ছলতা অর্জনে সহায়তা করা এবং একটি সুসংহত সঞ্চয় সংস্কৃতি গড়ে তোলা। 
          স্বচ্ছ ও নিরাপদ লেনদেনের মাধ্যমে সদস্যদের আস্থা অর্জন করা আমাদের প্রধান লক্ষ্য।
        </p>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <i class="fas fa-eye text-green-600 text-xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">আমাদের দৃষ্টিভঙ্গি</h2>
        </div>
        <p class="text-gray-600 leading-relaxed">
          একটি আত্মনির্ভরশীল আর্থিক সম্প্রদায় গড়ে তোলা যেখানে প্রতিটি সদস্য আর্থিকভাবে সুরক্ষিত 
          এবং ভবিষ্যতের জন্য প্রস্তুত থাকবেন।
        </p>
      </div>
    </div>

    <!-- Core Values -->
    <div class="bg-white rounded-2xl p-6 shadow-xl">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">আমাদের মূল্যবোধ</h2>
        <p class="text-gray-500">যেসব মূল্যবোধ আমাদের পরিচালিত করে</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center p-4 hover:bg-purple-50 rounded-xl transition-all">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-handshake text-purple-600 text-2xl"></i>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">স্বচ্ছতা</h3>
          <p class="text-sm text-gray-500">সব লেনদেন স্বচ্ছ ও নিরাপদ</p>
        </div>
        
        <div class="text-center p-4 hover:bg-purple-50 rounded-xl transition-all">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-users text-purple-600 text-2xl"></i>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">সহযোগিতা</h3>
          <p class="text-sm text-gray-500">সবাই মিলে এগিয়ে চলা</p>
        </div>
        
        <div class="text-center p-4 hover:bg-purple-50 rounded-xl transition-all">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-chart-line text-purple-600 text-2xl"></i>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">উন্নয়ন</h3>
          <p class="text-sm text-gray-500">ক্রমাগত উন্নয়ন ও অগ্রগতি</p>
        </div>
        
        <div class="text-center p-4 hover:bg-purple-50 rounded-xl transition-all">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-shield-alt text-purple-600 text-2xl"></i>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">নিরাপত্তা</h3>
          <p class="text-sm text-gray-500">সদস্যদের অর্থ নিরাপদ</p>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div class="bg-white rounded-2xl p-6 shadow-xl">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">কিভাবে কাজ করে</h2>
        <p class="text-gray-500">সদস্য হওয়ার পর ধাপসমূহ</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="relative">
          <div class="text-center">
            <div class="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              ১
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">সদস্য নিবন্ধন</h3>
            <p class="text-sm text-gray-500">প্রাথমিক তথ্য প্রদান করে সদস্য হন</p>
          </div>
          <div class="hidden md:block absolute top-6 left-full w-full h-0.5 bg-purple-200"></div>
        </div>
        
        <div class="relative">
          <div class="text-center">
            <div class="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              ২
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">মাসিক জমা</h3>
            <p class="text-sm text-gray-500">নির্ধারিত পরিমাণ মাসিক জমা দিন</p>
          </div>
          <div class="hidden md:block absolute top-6 left-full w-full h-0.5 bg-purple-200"></div>
        </div>
        
        <div class="relative">
          <div class="text-center">
            <div class="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              ৩
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">সুবিধা প্রাপ্তি</h3>
            <p class="text-sm text-gray-500">সঞ্চয় ও বিনিয়োগের সুবিধা গ্রহণ</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Deposit Types -->
    <div class="bg-white rounded-2xl p-6 shadow-xl">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">আমানতের ধরন</h2>
        <p class="text-gray-500">সদস্যদের জন্য উপলব্ধ সঞ্চয় সুবিধা</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border rounded-xl p-4 hover:border-purple-300 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-calendar-week text-purple-600 text-xl"></i>
            <h3 class="font-semibold text-gray-800">মাসিক সঞ্চয়</h3>
          </div>
          <p class="text-sm text-gray-500">প্রতি মাসে নির্ধারিত পরিমাণ জমা</p>
          <p class="text-xs text-gray-400 mt-2">নিয়মিত সঞ্চয়ের সহজ উপায়</p>
        </div>
        
        <div class="border rounded-xl p-4 hover:border-purple-300 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-calendar-alt text-purple-600 text-xl"></i>
            <h3 class="font-semibold text-gray-800">বার্ষিক সঞ্চয়</h3>
          </div>
          <p class="text-sm text-gray-500">বছরে একবার বড় অঙ্কের জমা</p>
          <p class="text-xs text-gray-400 mt-2">দীর্ঘমেয়াদী বিনিয়োগের জন্য</p>
        </div>
        
        <div class="border rounded-xl p-4 hover:border-purple-300 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-chart-line text-purple-600 text-xl"></i>
            <h3 class="font-semibold text-gray-800">অতিরিক্ত জমা</h3>
          </div>
          <p class="text-sm text-gray-500">নির্ধারিত পরিমাণের অতিরিক্ত জমা</p>
          <p class="text-xs text-gray-400 mt-2">বিশেষ প্রয়োজনে অতিরিক্ত সঞ্চয়</p>
        </div>
      </div>
    </div>

    <!-- Benefits -->
    <div class="bg-white rounded-2xl p-6 shadow-xl">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">সদস্য হওয়ার সুবিধা</h2>
        <p class="text-gray-500">কেন আমাদের সাথে যুক্ত হবেন</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-start gap-3 p-3 hover:bg-purple-50 rounded-xl transition-all">
          <i class="fas fa-chart-simple text-purple-600 text-xl mt-1"></i>
          <div>
            <h3 class="font-semibold text-gray-800">উচ্চ মুনাফা</h3>
            <p class="text-sm text-gray-500">সঞ্চয়ে প্রতিযোগিতামূলক মুনাফা</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3 p-3 hover:bg-purple-50 rounded-xl transition-all">
          <i class="fas fa-headset text-purple-600 text-xl mt-1"></i>
          <div>
            <h3 class="font-semibold text-gray-800">২৪/৭ সহায়তা</h3>
            <p class="text-sm text-gray-500">যেকোনো সময় আমাদের সাথে যোগাযোগ</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3 p-3 hover:bg-purple-50 rounded-xl transition-all">
          <i class="fas fa-mobile-alt text-purple-600 text-xl mt-1"></i>
          <div>
            <h3 class="font-semibold text-gray-800">ডিজিটাল প্ল্যাটফর্ম</h3>
            <p class="text-sm text-gray-500">অনলাইনে লেনদেন ও হিসাব পর্যবেক্ষণ</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3 p-3 hover:bg-purple-50 rounded-xl transition-all">
          <i class="fas fa-shield-heart text-purple-600 text-xl mt-1"></i>
          <div>
            <h3 class="font-semibold text-gray-800">নিরাপদ লেনদেন</h3>
            <p class="text-sm text-gray-500">স্বয়ংক্রিয় ও নিরাপদ সিস্টেম</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl text-white text-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-3">যোগ দিন আমাদের সাথে</h2>
      <p class="text-lg opacity-90 mb-6">আজই সদস্য হয়ে উঠুন এবং আর্থিক স্বাধীনতার পথে এগিয়ে যান</p>
      <NuxtLink 
        to="/get-member" 
        class="inline-block bg-white text-purple-600 rounded-xl px-8 py-3 font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        সদস্য হন
      </NuxtLink>
    </div>
  </div>
</template>