/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main';
export { default as UserHome } from './user-home';
export { Login, Signup } from './auth-form';
export { default as Board } from './board';
export { default as Room } from './room';
export { default as NewGame } from './new-game';
export { default as Sidebar } from './sidebar';
export { default as CombatRisk } from './combat-risk';
export { default as CombatCustom } from './combat-custom';
export { default as ChannelList } from './channelList';
export { default as GameOver } from './gameover';
export { default as Tutorial } from './tutorial';
export { default as PhaseModal } from './phase-modal';
export { default as AIturn } from './AIturn';
export { default as Credits } from './credits';
export { default as ClassSelect } from './class-select';
export { default as Rules } from './rules';
export { default as Scoreboard } from './scoreboard';
