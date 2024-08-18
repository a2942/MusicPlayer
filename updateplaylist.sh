#!/bin/bash
cd ./sounds/
# 使用find命令查找音频文件，并将结果输出到文件
# Use the find command to find the audio file and output the result to the file
find ./ -type f \( -name "*.mp3" -o -name "*.wav" -o -name "*.flac" -o -name "*.ogg" \) > ../audio_files.txt
# 定义要填写的内容，处理路径并添加换行
# Define what you want to fill in, process the path, and add line breaks
content=$(cat ../audio_files.txt | sed -E 's/\.\///g' | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/",\n"/g')
# 构造完整的内容，添加换行
# Construct the complete content, add line breaks
replacement="const playlist = [\n\"$content\"\n];"
# 将内容直接写入文件，覆盖原有内容，增加换行
# Write content directly to the file, overwrite the original content, and add line breaks
echo -e "$replacement" > ../playlist.js
# 提示用户操作已完成
# Prompts the user that the action is complete
echo "已成功填写 playlist.js 文件中的 const playlist = [...] 部分。"
echo "The const playlist = [...] section in the playlist.js file has been successfully completed."
# 删除临时文件
# Delete temporary files
rm ../audio_files.txt