import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default {
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchIcon: {
    marginRight: 20
  },
  container: {
    justifyContent: 'center',
    paddingBottom: 3
  },
  orgTitleView: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 17
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    flex: 1,
    height: deviceWidth,
    width: deviceWidth,
    marginTop: 3
  },
  goToCampaignButton: {
    backgroundColor: 'rgba(0, 255, 157, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartOutline: {
    fontSize: 28,
    marginLeft: 15,
    color: 'black'
  },
  heartFill: {
    fontSize: 28,
    marginLeft: 15,
    color: '#e60024'
  },
  bookmarkOutline: {
    fontSize: 28,
    marginRight: 20,
    color: 'black'
  },
  bookmarkFill: {
    fontSize: 28,
    marginRight: 20,
    color: '#00FF9D'
  },
  likes: {
    marginLeft: 15
  },
  goToCampaignText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18
  },
  campDesc: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15,
    marginBottom: 15
  },
  campDescName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    paddingBottom: 10
  },
  campDescText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19
  },
  comments: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    lineHeight: 16,
    marginLeft: 15,
    paddingTop: 12,
    color: '#7B7D88'
  },
  readMore: {
    color: '#929292'
  },
  timeText: {
    color: '#929292',
    fontSize: 10,
    marginLeft: 15,
    marginTop: 15,
    paddingBottom: 8
  },
  demarcation: {
    marginTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#eee'
  }
};
