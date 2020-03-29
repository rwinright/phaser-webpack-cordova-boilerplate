//An assorted assortment of helpful helper functions to help you clean up your classy classes.

export default function Helpers(){
  let generateAnimations = (frames, scene, textureKey) => {
  frames.forEach(frame => {
    let generatedFrames = scene.anims.generateFrameNames(textureKey, {
      start: frame.start,
        end: frame.end, prefix: `${frame.frameName}/0`, suffix: '.png'
      });
      scene.anims.create({
        key: frame.frameName,
        frames: generatedFrames,
        frameRate: 10,
        repeat: frame.repeat
      });
    });
  }

  return({
    generateAnimations
  })
}