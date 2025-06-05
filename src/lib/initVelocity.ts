// lib/initVelocity.ts
import $ from 'jquery';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui'; 

if (typeof window !== 'undefined') {
  window.$ = $;
  window.jQuery = $;
  window.Velocity = Velocity;
}
