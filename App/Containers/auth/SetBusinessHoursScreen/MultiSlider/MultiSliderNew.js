import React from 'react';
import { Text } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';

import { StyleSheet, PanResponder, View, Platform, Dimensions, I18nManager, ImageBackground } from 'react-native';

import DefaultMarker from './DefaultMarker';
import DefaultLabel from './DefaultLabel';
import { createArray, valueToPosition, positionToValue } from './converters';
import { Palette } from 'App/Theme/Palette';
import LabelMultiSlider from '../LabelMultiSlider';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default class MultiSliderNew extends React.Component {
  static defaultProps = {
    values: [0],
    onValuesChangeStart: () => {},
    onValuesChange: values => {},
    onValuesChangeFinish: values => {},
    onMarkersPosition: values => {},
    step: 1,
    min: 0,
    max: 10,
    touchDimensions: {
      height: rh(50),
      width: rw(50),
      borderRadius: 15,
      slipDisplacement: 200,
    },
    customMarker: DefaultMarker,
    customMarkerLeft: DefaultMarker,
    customMarkerRight: DefaultMarker,
    customLabel: DefaultLabel,
    markerOffsetX: 0,
    markerOffsetY: 0,
    markerSize: 0,
    sliderLength: 280,
    onToggleOne: undefined,
    onToggleTwo: undefined,
    stepsAs: [],
    showSteps: false,
    showStepMarkers: true,
    showStepLabels: true,
    enabledOne: true,
    enabledTwo: true,
    allowOverlap: false,
    snapped: false,
    smoothSnapped: false,
    vertical: false,
    minMarkerOverlapDistance: 0,
    minMarkerOverlapStepDistance: 0,
    testID: '',
    chunkValues: [
      {
        start: 0,
        end: 0,
      },
    ],
    onDelete: index => {},
  };

  _panResponders = [];

  initializeComponent = (props, isUpdated = false) => {
    _panResponders = [];
    if (this.props.minMarkerOverlapDistance > 0 && this.props.minMarkerOverlapStepDistance > 0) {
      console.error(
        'You should provide either "minMarkerOverlapDistance" or "minMarkerOverlapStepDistance", not both. Expect unreliable results.',
      );
    }

    this.optionsArray = this.props.optionsArray || createArray(this.props.min, this.props.max, this.props.step);
    this.stepLength = this.props.sliderLength / (this.optionsArray.length - 1);

    var initialValues = this.props.values.map(value =>
      valueToPosition(value, this.optionsArray, this.props.sliderLength, this.props.markerSize),
    );

    var initialChunkPositions = this.props.chunkValues.map(chunkValue => ({
      start: valueToPosition(chunkValue.start, this.optionsArray, this.props.sliderLength, this.props.markerSize),
      end: valueToPosition(chunkValue.end, this.optionsArray, this.props.sliderLength, this.props.markerSize),
    }));

    this._panResponders = this.props.chunkValues.map(chunkValue => ({
      start: null,
      end: null,
    }));

    var tempStepsAs = {};
    this.props.stepsAs.forEach(step => {
      if (step?.index !== undefined) {
        tempStepsAs[step?.index] = step;
      }
    });

    this.stepsAs = {};
    this.optionsArray.forEach((ops, index) => {
      if (tempStepsAs[index]) {
        var step = tempStepsAs[index];
        this.stepsAs[index] = {
          stepLabel: step?.stepLabel ? step.stepLabel : ops,
          suffix: step?.suffix ? step.suffix : '',
          prefix: step?.prefix ? step.prefix : '',
        };
      } else {
        this.stepsAs[index] = {
          stepLabel: ops,
          suffix: '',
          prefix: '',
        };
      }
    });

    const newState = {
      pressedOne: true,
      valueOne: this.props.values[0],
      valueTwo: this.props.values[1],
      pastOne: initialValues[0],
      pastTwo: initialValues[1],
      positionOne: initialValues[0],
      positionTwo: initialValues[1],
      chunkValues: this.props.chunkValues,
      chunkPositions: cloneDeep(initialChunkPositions),
      chunkPast: cloneDeep(initialChunkPositions),
      chunkState: this.props.chunkValues.map(_ => ({
        start: {
          pressed: false,
        },
        end: {
          pressed: false,
        },
      })),
    };

    if (isUpdated) {
      this.setState(newState);
    } else {
      this.state = newState;
    }

    this.subscribePanResponder();
    // this.forceUpdate()
  };

  constructor(props) {
    super(props);

    this.initializeComponent(props);
  }

  subscribePanResponder = () => {
    var customPanResponder = (start, move, end) => {
      return PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => start(),
        onPanResponderMove: (evt, gestureState) => move(gestureState),
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderRelease: (evt, gestureState) => end(gestureState),
        onPanResponderTerminate: (evt, gestureState) => end(gestureState),
        onShouldBlockNativeResponder: (evt, gestureState) => true,
      });
    };

    this._panResponderBetween = customPanResponder(
      gestureState => {
        /*this.startOne(gestureState);
        this.startTwo(gestureState);*/
      },
      gestureState => {
        /*this.moveOne(gestureState);
        this.moveTwo(gestureState);*/
      },
      gestureState => {
        /*this.endOne(gestureState);
        this.endTwo(gestureState);*/
      },
    );

    this._panResponders.forEach((responder, index) => {
      responder.start = customPanResponder(
        this.startChunkStart(index),
        this.moveChunkStart(index),
        this.endChunkStart(index),
      );
      responder.end = customPanResponder(this.startChunkEnd(index), this.moveChunkEnd(index), this.endChunkEnd(index));
    });
  };

  startChunkStart = index => () => {
    if (this.props.enabledOne) {
      this.props.onValuesChangeStart();
      this.setState(currenState => {
        currenState.chunkState[index].start = true;
        return currenState;
      });
    }
  };

  startChunkEnd = index => () => {
    if (this.props.enabledTwo) {
      this.props.onValuesChangeStart();
      /*this.setState({
        twoPressed: !this.state.twoPressed,
      });*/
      this.setState(currenState => {
        currenState.chunkState[index].end = true;
        return currenState;
      });
    }
  };

  moveChunkStart = index => gestureState => {
    /*if (!this.props.enabledOne) {
      return;
    }*/

    const accumDistance = this.props.vertical ? -gestureState.dy : gestureState.dx;
    const accumDistanceDisplacement = this.props.vertical ? gestureState.dx : gestureState.dy;

    const unconfined = I18nManager.isRTL
      ? this.state.chunkPast[index].start - accumDistance
      : accumDistance + this.state.chunkPast[index].start;
    var bottom = this.props.markerSize / 2;
    if (index > 0) {
      bottom =
        this.state.chunkPositions[index - 1].end + (this.props.minMarkerOverlapStepDistance || 1) * this.stepLength;
    }
    var trueTop =
      this.state.chunkPositions[index].end -
      (this.props.allowOverlap
        ? 0
        : this.props.minMarkerOverlapDistance > 0
        ? this.props.minMarkerOverlapDistance
        : (this.props.minMarkerOverlapStepDistance || 1) * this.stepLength);
    var top = trueTop === 0 ? 0 : trueTop || this.props.sliderLength - this.props.markerSize / 2;
    var confined = unconfined < bottom ? bottom : unconfined > top ? top : unconfined;
    var slipDisplacement = this.props.touchDimensions.slipDisplacement;

    if (Math.abs(accumDistanceDisplacement) < slipDisplacement || !slipDisplacement) {
      var value = positionToValue(confined, this.optionsArray, this.props.sliderLength, this.props.markerSize);
      var snapped = valueToPosition(value, this.optionsArray, this.props.sliderLength, this.props.markerSize);
      this.setState(currentState => {
        currentState.chunkPositions[index].start = this.props.snapped ? snapped : confined;
        return currentState;
      });

      if (value !== this.state.chunkValues[index].start) {
        this.setState(
          currentState => {
            currentState.chunkValues[index].start = value;
            return currentState;
          },
          () => {
            var change = [this.state.chunkValues[index].start];
            if (this.state.chunkValues[index].end) {
              change.push(this.state.chunkValues[index].end);
            }
            const changedChunkValues = cloneDeep(this.state.chunkValues);
            changedChunkValues[index].start = value;

            this.props.onChunkValuesChange(changedChunkValues);

            this.props.onMarkersPosition([
              this.state.chunkPositions[index].start,
              this.state.chunkPositions[index].end,
            ]);
          },
        );
      }
    }
  };

  moveChunkEnd = index => gestureState => {
    const accumDistance = this.props.vertical ? -gestureState.dy : gestureState.dx;
    const accumDistanceDisplacement = this.props.vertical ? gestureState.dx : gestureState.dy;

    const unconfined = I18nManager.isRTL
      ? this.state.chunkPast[index].end - accumDistance
      : accumDistance + this.state.chunkPast[index].end;
    var bottom =
      this.state.chunkPositions[index].start +
      (this.props.allowOverlap
        ? 0
        : this.props.minMarkerOverlapDistance > 0
        ? this.props.minMarkerOverlapDistance
        : (this.props.minMarkerOverlapStepDistance || 1) * this.stepLength);
    var top = this.props.sliderLength - this.props.markerSize / 2;
    if (this.state.chunkPositions.length > index + 1) {
      top =
        this.state.chunkPositions[index + 1].start - (this.props.minMarkerOverlapStepDistance || 1) * this.stepLength;
    }
    var confined = unconfined < bottom ? bottom : unconfined > top ? top : unconfined;
    var slipDisplacement = this.props.touchDimensions.slipDisplacement;

    if (Math.abs(accumDistanceDisplacement) < slipDisplacement || !slipDisplacement) {
      var value = positionToValue(confined, this.optionsArray, this.props.sliderLength, this.props.markerSize);
      var snapped = valueToPosition(value, this.optionsArray, this.props.sliderLength, this.props.markerSize);

      this.setState(currentState => {
        currentState.chunkPositions[index].end = this.props.snapped ? snapped : confined;
        return currentState;
      });

      if (value !== this.state.chunkValues[index].end) {
        this.setState(
          currentState => {
            currentState.chunkValues[index].end = value;
            return currentState;
          },
          () => {
            const changedChunkValues = cloneDeep(this.state.chunkValues);
            changedChunkValues[index].end = value;

            this.props.onChunkValuesChange(changedChunkValues);

            this.props.onMarkersPosition([
              this.state.chunkPositions[index].start,
              this.state.chunkPositions[index].end,
            ]);
          },
        );
      }
    }
  };

  endChunkStart = index => gestureState => {
    /*if (gestureState.moveX === 0 && this.props.onToggleOne) {
      this.props.onToggleOne();
      return;
    }*/

    var snapped = valueToPosition(this.state.chunkValues[index].start, this.optionsArray, this.props.sliderLength);

    this.setState(
      currentState => {
        currentState.chunkPast[index].start = this.props.smoothSnapped
          ? snapped
          : currentState.chunkPositions[index].start;
        if (this.props.smoothSnapped) {
          currentState.chunkPositions[index].start = snapped;
        }
        currentState.chunkState[index].start.pressed = false;
        return currentState;
      },
      () => {
        var change = [this.state.chunkValues[index].start];
        if (this.state.chunkValues[index].end) {
          change.push(this.state.chunkValues[index].end);
        }
        this.props.onValuesChangeFinish(change);
      },
    );
  };

  endChunkEnd = index => gestureState => {
    /*if (gestureState.moveX === 0 && this.props.onToggleTwo) {
      this.props.onToggleTwo();
      return;
    }*/

    var snapped = valueToPosition(this.state.chunkValues[index].end, this.optionsArray, this.props.sliderLength);

    this.setState(
      currentState => {
        currentState.chunkPast[index].end = this.props.smoothSnapped ? snapped : this.state.chunkPositions[index].end;
        if (this.props.smoothSnapped) {
          currentState.chunkPositions[index].end = snapped;
        }
        currentState.chunkState[index].end.pressed = !currentState.chunkState[index].end.pressed;
        return currentState;
      },
      () => {
        this.props.onValuesChangeFinish([this.state.chunkValues[index].start, this.state.chunkValues[index].end]);
      },
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const { positionOne: prevPositionOne, positionTwo: prevPositionTwo } = prevState;

    const { positionOne, positionTwo } = this.state;

    // this.initializeComponent(this.props);

    /*if (positionOne !== prevPositionOne || positionTwo !== prevPositionTwo) {
      this.props.onMarkersPosition([positionOne, positionTwo]);
    }*/

    for (let chunkStateItem of this.state.chunkState) {
      if (chunkStateItem.start.pressed || chunkStateItem.end.pressed) return;
    }

    let nextState = this.state;

    let shouldUpdate =
      prevProps.min !== this.props.min ||
      prevProps.max !== this.props.max ||
      prevProps.step !== this.props.step ||
      prevProps.sliderLength !== this.props.sliderLength ||
      prevProps.sliderLength !== this.props.sliderLength ||
      prevProps.chunkValues.length !== this.props.chunkValues.length;

    if (!shouldUpdate) {
      this.props.chunkValues.forEach((chunkValue, index) => {
        if (
          prevProps.chunkValues[index].start !== chunkValue.start ||
          prevProps.chunkValues[index].end !== chunkValue.end
        ) {
          shouldUpdate = true;
        }
      });
    }

    if (shouldUpdate) {
      this.initializeComponent(this.props, true);

      /*this.optionsArray = this.props.optionsArray || createArray(this.props.min, this.props.max, this.props.step);

      this.stepLength = this.props.sliderLength / this.optionsArray.length;

      this.props.chunkValues.forEach((chunkValue, index) => {
        const start = valueToPosition(
          chunkValue.start,
          this.optionsArray,
          this.props.sliderLength,
          this.props.markerSize,
        );

        nextState.chunkPast[index]
      })

      const positionOne = valueToPosition(
        this.props.values[0],
        this.optionsArray,
        this.props.sliderLength,
        this.props.markerSize,
      );
      nextState.valueOne = this.props.values[0];
      nextState.pastOne = positionOne;
      nextState.positionOne = positionOne;

      const positionTwo = valueToPosition(
        this.props.values[1],
        this.optionsArray,
        this.props.sliderLength,
        this.props.markerSize,
      );
      nextState.valueTwo = this.props.values[1];
      nextState.pastTwo = positionTwo;
      nextState.positionTwo = positionTwo;

      this.setState(nextState);*/
    }
  }

  getSteps() {
    const stepLength = this.props.sliderLength / (this.optionsArray.length - 1);
    const textStyles = [
      styles.stepLabel,
      this.props.stepLabelStyle,
      ...(this.props.vertical ? [{ transform: [{ rotate: '90deg' }] }] : []),
    ];
    const markerHeight = this.props?.trackStyle?.height || styles.track.height;
    const markerStyles = [
      styles.stepMarker,
      {
        height: markerHeight,
        width: markerHeight,
        borderRadius: markerHeight / 2,
      },
      this.props.stepMarkerStyle,
    ];

    return this.optionsArray.map((number, index) => {
      var step = this.stepsAs[index];
      return (
        <View key={number} style={[styles.step, this.props.stepStyle, { left: stepLength * index }]}>
          {this.props.showStepMarkers && index !== 0 && index !== this.optionsArray.length - 1 && (
            <View style={markerStyles} />
          )}
          {this.props.showStepLabels && (
            <Text style={textStyles}>{`${step.prefix}${step.stepLabel}${step.suffix}`}</Text>
          )}
        </View>
      );
    });
  }

  render() {
    const { positionOne, positionTwo } = this.state;
    const { selectedStyle, unselectedStyle, sliderLength, markerOffsetX, markerOffsetY } = this.props;
    const twoMarkers = this.props.values.length == 2; // when allowOverlap, positionTwo could be 0, identified as string '0' and throwing 'RawText 0 needs to be wrapped in <Text>' error

    const trackOneLength = positionOne;
    const trackOneStyle = unselectedStyle;
    const trackThreeLength = twoMarkers ? sliderLength - positionTwo : 0;
    const trackThreeStyle = unselectedStyle;
    const trackTwoLength = sliderLength - trackOneLength - trackThreeLength;
    const trackTwoStyle = twoMarkers ? selectedStyle || styles.selectedTrack : unselectedStyle;
    const Marker = this.props.customMarker;

    const MarkerLeft = this.props.customMarkerLeft;
    const MarkerRight = this.props.customMarkerRight;
    const isMarkersSeparated = this.props.isMarkersSeparated || false;

    const Label = this.props.customLabel;

    const { slipDisplacement, height, width, borderRadius } = this.props.touchDimensions;
    const touchStyle = {
      borderRadius: borderRadius || 0,
      ...(height && { height }),
      ...(width && { width }),
    };

    const markerContainerOne = {
      top: markerOffsetY - 24,
      left: trackOneLength + markerOffsetX - 24,
    };

    const markerContainerTwo = {
      top: markerOffsetY - 24,
      right: trackThreeLength + markerOffsetX - 24,
    };

    const containerStyle = [styles.container, this.props.containerStyle];

    if (this.props.vertical) {
      containerStyle.push({
        transform: [{ rotate: '-90deg' }],
      });
    }

    const getMarkerContainerStyle = position => {
      return {
        top: markerOffsetY - 24,
        left: position + markerOffsetX - 24,
      };
    };

    const getUnselectedTrackStyle = index => {
      let width = 0;
      if (index === 0) {
        width = this.state.chunkPositions[index]?.start || 0;
      } else if (index === this.state.chunkPositions.length) {
        width = sliderLength - (this.state.chunkPositions[index - 1]?.end || 0);
      } else {
        width = (this.state.chunkPositions[index]?.start || 0) - (this.state.chunkPositions[index - 1]?.end || 0);
      }
      return {
        width,
        ...unselectedStyle,
      };
    };

    const getSelectedTrackStyle = index => {
      return {
        width: this.state.chunkPositions[index].end - this.state.chunkPositions[index].start,
        ...selectedStyle,
      };
    };

    const body = (
      <React.Fragment>
        <View style={[styles.fullTrack, { width: sliderLength }]}>
          {this.props.chunkValues.map((value, index) => (
            <LabelMultiSlider
              text={this.props.chunkValues[index].text}
              centerToLeft={
                ((this.state.chunkPositions[index]?.start || 0) + (this.state.chunkPositions[index]?.end || 0)) / 2
              }
              location={index % 2 == 1 ? 'down' : 'up'}
              sliderLength={this.props.sliderLength}
              onDelete={() => this.props.onDelete(index)}
            />
          ))}

          {this.state.chunkPositions.map((position, index) => (
            <>
              <View style={[styles.track, this.props.trackStyle, getUnselectedTrackStyle(index)]} />
              <View
                style={[
                  styles.track,
                  this.props.trackStyle,
                  getSelectedTrackStyle(index),
                  index % 2 == 1 ? { backgroundColor: Palette.color_008BAA } : {},
                ]}
                //{...(twoMarkers ? this._panResponderBetween.panHandlers : {})}
              />
            </>
          ))}
          <View
            style={[styles.track, this.props.trackStyle, getUnselectedTrackStyle(this.state.chunkPositions.length)]}
          />
          {this.props.chunkValues.map((chunkValue, index) => (
            <>
              <View
                style={[
                  styles.markerContainer,
                  // markerContainerOne,
                  getMarkerContainerStyle(this.state.chunkPositions[index]?.start || 0),
                  this.props.markerContainerStyle,
                  (this.state.chunkPositions[index]?.start || 0) > sliderLength / 2 && styles.topMarkerContainer,
                ]}>
                <View
                  style={[styles.touch, touchStyle]}
                  //ref={component => (this._markerOne = component)}
                  {...this._panResponders[index]?.start?.panHandlers}>
                  <Marker
                    // enabled={this.props.enabledOne}
                    enabled={true}
                    pressed={this.state.chunkState[index]?.start?.pressed}
                    style={
                      index % 2 == 1
                        ? {
                            backgroundColor: Palette.color_008BAA,
                          }
                        : {}
                    }
                    pressedMarkerStyle={this.props.pressedMarkerStyle}
                    disabledMarkerStyle={this.props.disabledMarkerStyle}
                    currentValue={this.state.chunkValues[index]?.start || 0}
                    valuePrefix={this.props.valuePrefix}
                    valueSuffix={this.props.valueSuffix}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.markerContainer,
                  // markerContainerTwo,
                  getMarkerContainerStyle(this.state.chunkPositions[index]?.end || 0),
                  this.props.markerContainerStyle,
                ]}>
                <View
                  style={[styles.touch, touchStyle]}
                  // ref={component => (this._markerTwo = component)}
                  {...this._panResponders[index]?.end?.panHandlers}>
                  <Marker
                    pressed={this.state.chunkState[index]?.end?.pressed}
                    markerStyle={this.props.markerStyle}
                    pressedMarkerStyle={this.props.pressedMarkerStyle}
                    disabledMarkerStyle={this.props.disabledMarkerStyle}
                    currentValue={this.state.chunkValues[index]?.end || 0}
                    // enabled={this.props.enabledTwo}
                    enabled={true}
                    valuePrefix={this.props.valuePrefix}
                    valueSuffix={this.props.valueSuffix}
                    style={
                      index % 2 == 1
                        ? {
                            backgroundColor: Palette.color_008BAA,
                          }
                        : {}
                    }
                  />
                </View>
              </View>
            </>
          ))}
        </View>
      </React.Fragment>
    );

    return (
      <View testID={this.props.testID}>
        {this.props.enableLabel && (
          <Label
            oneMarkerValue={this.state.valueOne}
            twoMarkerValue={this.state.valueTwo}
            minValue={this.props.min}
            maxValue={this.props.max}
            oneMarkerLeftPosition={positionOne}
            twoMarkerLeftPosition={positionTwo}
            oneMarkerPressed={this.state.onePressed}
            twoMarkerPressed={this.state.twoPressed}
          />
        )}
        {this.props.imageBackgroundSource && (
          <ImageBackground
            source={this.props.imageBackgroundSource}
            style={[{ width: '100%', height: '100%' }, containerStyle]}>
            {body}
          </ImageBackground>
        )}
        {!this.props.imageBackgroundSource && <View style={containerStyle}>{body}</View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: rh(50),
    justifyContent: 'center',
  },
  fullTrack: {
    flexDirection: 'row',
  },
  track: {
    ...Platform.select({
      ios: {
        height: rh(2),
        borderRadius: 2,
        backgroundColor: '#A7A7A7',
      },
      android: {
        height: rh(2),
        backgroundColor: '#CECECE',
      },
      web: {
        height: rh(2),
        borderRadius: 2,
        backgroundColor: '#A7A7A7',
      },
    }),
  },
  selectedTrack: {
    ...Platform.select({
      ios: {
        backgroundColor: '#095FFF',
      },
      android: {
        backgroundColor: '#0D8675',
      },
      web: {
        backgroundColor: '#095FFF',
      },
    }),
  },
  markerContainer: {
    position: 'absolute',
    width: rw(48),
    height: rh(48),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMarkerContainer: {
    zIndex: 1,
  },
  touch: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  step: {
    position: 'absolute',
    marginLeft: -5,
  },
  stepMarker: {
    position: 'absolute',
    left: 2,
    width: rw(6),
    height: rh(6),
    backgroundColor: '#0000008c',
    borderRadius: 3,
  },
  stepLabel: {
    position: 'absolute',
    top: 15,
    color: '#333',
  },
});
