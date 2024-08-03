import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({
  video: {
    title, 
    thambnail, 
    video, 
    creator : {
      username, 
      avatar
    }
  }
}) => {
  const [play, setPlay] = useState(false)

  return (
    <View className = "flex-col items-center px-4 mb-14">

      <View 
        className="flex-row gap-3 item-start"
      >
        <View 
          className="justify-center item-center flex-1 flex-row"
        >
          <View
            className="w-[46px] h-[46px] rounded-lg border-secondary justify-center items-center p-0.5"
          >
            <Image
              source={{uri: avatar}}
              className="w-full h-full rounded-lg"
              resizeMode='cover'
            />
          </View>

          <View
            className="justify-center flex-1 ml-3 gap-y-1"
          >
            <Text 
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        {/* menu icon */}
        <View
          className="pt-2 "
        >
          <Image 
            source={icons.menu}
            className={`w-5 h-5 `}
            resizeMode='contain'
          />
        </View>

      </View>

      {/* video  */}
      {
        play ? (
          <Video
            source={{uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
            className="w-full h-60 rounded-xl mt-3"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if(status.didJustFinish) {
                setPlay(false)
              }
            }}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className="w-full h-60 rounded-xl relative justify-center items-center"
          >
            <Image 
              source={{uri: thambnail}}
              className="w-full h-full rounded-xl mt-3"
              resizeMode='cover'
            />
            <Image 
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode='contain'
            />
          </TouchableOpacity>
        )
      }

    </View>
  )
}

export default VideoCard