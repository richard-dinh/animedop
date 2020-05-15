import React, { useEffect, useContext } from 'react'
import ReactPlayer from 'react-player'
import { VideoContext } from './../context/VideoContext'
import {
  resultsJikanFromTitle,
  songsByAnimeTitleYear,
  songsByAnimeTitleYearBackup,
  getOpAndEd,
} from './../model/Reddit'
import loadingGif from './../assets/raphtalia-spin.gif'

// Typo = paragraph, any text
import { Paper, Typography, Grid } from '@material-ui/core'

const VideoDetail = ({ animeId }) => {
  // const { valueVideoSelected, valueAnimes } = useContext(VideoContext)
  // const videoSelected = valueVideoSelected[0]
  // const animes = valueAnimes[0]
  console.log('Video Detail: ' + animeId)
  const { valueVideos, valueVideoSelected, valueAnimes } = useContext(
    VideoContext
  )
  const [animes, setAnimes] = valueAnimes
  const setVideos = valueVideos[1]
  const [videoSelected, setVideoSelected] = valueVideoSelected

  const styleLoadingGif = {
    textAlign: 'center',
  }

  useEffect(() => {
    setVideoSelected('')
    setVideos([])
    let searchBy_mal_id = animes.find(
      (anime) => anime.mal_id.toString().trim() === animeId
    )
    console.log('found: ' + JSON.stringify(searchBy_mal_id))

    const data = searchBy_mal_id
    // const link = getOpAndEd(
    //   '2019#wiki_tate_no_yuusha_no_nariagari',
    //   data.title,
    //   data.img
    // ).then((wikiPage) => {
    //   console.log('getOpAndEd-' + JSON.stringify(wikiPage))
    // })

    const link = songsByAnimeTitleYear(
      data.title,
      data.mal_id,
      data.year,
      data.img
    ).then(async ({ wikiPage, title }) => {
      console.log('wikiPage-' + JSON.stringify(wikiPage))
      await getOpAndEd(wikiPage, title ? title : data.title, data.img)
        .then((result) => {
          console.log('result-' + JSON.stringify(result))

          var videosData = []
          for (var j = 0; j < result.length; j++) {
            if (result[j].link != undefined) {
              videosData.push({
                key: j,
                type: result[j].number,
                link: result[j].link,
                title: result[j].title,
                episode: result[j].episode,
              })
            }
          }
          console.log('videosData-' + JSON.stringify(videosData))

          // const videosData = response.data.items
          setVideos(videosData)
          setVideoSelected(videosData[0].link)
        })
        .catch((e) => {
          console.log(e)
          const link2 = songsByAnimeTitleYearBackup(
            data.title,
            data.mal_id,
            data.year,
            data.img
          ).then(async ({ wikiPage, title }) => {
            console.log('wikiPage-' + JSON.stringify(wikiPage))
            await getOpAndEd(
              wikiPage,
              title ? title : data.title,
              data.img
            ).then((result) => {
              console.log('result-' + JSON.stringify(result))

              var videosData = []
              for (var j = 0; j < result.length; j++) {
                if (result[j].link != undefined) {
                  videosData.push({
                    key: j,
                    type: result[j].number,
                    link: result[j].link,
                    title: result[j].title,
                    episode: result[j].episode,
                  })
                }
              }
              console.log('videosData-' + JSON.stringify(videosData))

              // const videosData = response.data.items
              setVideos(videosData)
              setVideoSelected(videosData[0].link)
            })
          })
        })
      //   //setVideoSelected(result[5].link)

      // })

      // console.log(response.data.items)
    })
  }, [])

  if (!videoSelected)
    return (
      <Grid container spacing={4} direction='column' justify='center'>
        <Grid item xs={12}>
          <div style={styleLoadingGif}>
            <img src={loadingGif} alt='loading...' />
            <Typography variant='h4'>
              {'I am your sword! Where you go, I will go with you.'}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    )

  // const videoSrc = `https://www.youtube.com/watch?v=${videoSelected.id.videoId}`
  const videoSrc = `${videoSelected}`
  return (
    <React.Fragment>
      <Paper elevation={6} style={{ height: '80%' }}>
        {/* <Grid spacing={4}>
          <Grid items xs={12}> */}
        <ReactPlayer
          url={videoSrc}
          playing
          controls
          width='100%'
          height='100%'
        />
        {/* </Grid>
        </Grid> */}
      </Paper>
      {/* <Paper elevation={6} style={{ padding: '15px' }}>
        <Typography variant='h4'>{videoSelected.snippet.title}</Typography>
        <Typography variant='subtitle1'>
          {videoSelected.snippet.channelTitle}
        </Typography>
        <Typography variant='subtitle2'>
          {videoSelected.snippet.description}
        </Typography>
      </Paper> */}
    </React.Fragment>
  )
}

export default VideoDetail
