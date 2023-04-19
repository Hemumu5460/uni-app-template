<template>
  <view class="up-files">
    <!-- 封装上传文件 -->
    <uni-file-picker
      ref="fileRef"
      :v-bind="$attrs"
      v-model="props.fileList"
      @select="uploadSuccess"
      @delete="delFile">
    </uni-file-picker>
  </view>
</template>

<script setup lang="ts">
  import { PropType, ref } from "vue"
  import { upImgFileApi } from "@/api/modules/index"
  interface fileInfo {
    name: string | undefined
    extname: string | undefined
    url: ArrayBuffer | string
    uuid: number
  }
  interface uploadFile<T, K> {
    tempFile: { uuid: number }
    tempFiles: Array<T>
    tempFilePaths: Array<K>
  }
  const fileRef: any = ref(null)
  // Api文档 https://uniapp.dcloud.net.cn/component/uniui/uni-file-picker.html#filepicker-props
  const props = defineProps({
    fileList: {
      type: Array as PropType<fileInfo[]>,
      default: () => [],
    },
    fileMediatype: {
      type: String,
      default: "image",
    },
    limit: {
      type: [Number, String],
      default: 1,
    },
    sizeType: {
      type: Array,
      default: () => ["original"],
    },
  })
  // 删除文件触发
  const uploadSuccess = <T extends fileInfo>(e: uploadFile<T, string>) => {
    const file = e?.tempFiles[0]
    uni.getFileSystemManager().readFile({
      filePath: e?.tempFilePaths[0],
      encoding: "base64",
      success: (res) => {
        upImgFileApi({
          file_base: `data:image/${file.extname};base64,${res.data}`,
        })
          .then((val) => {
            props.fileList.push({
              name: file?.name,
              extname: file?.extname,
              url: val.data.url,
              uuid: file.uuid,
            })
          })
          .catch((err) => {
            fileRef.value.clearFiles(props.fileList.length)
          })
      },
    })
  }
  // 删除文件触发
  const delFile = <T extends fileInfo>(
    e: uploadFile<T, string>,
    dataLst: any
  ) => {
    props.fileList.splice(
      props.fileList.findIndex((item) => item.uuid === e.tempFile.uuid),
      1
    )
  }
</script>
<style lang="scss" scoped></style>
