// We need to simply import a "bootstrap" script instead of bootstrapping from
// here due to Module Federation specificities.
// @see https://webpack.js.org/concepts/module-federation/#troubleshooting
import('./bootstrap')
