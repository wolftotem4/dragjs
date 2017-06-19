/*!
 * Copyright (c) 2017 randolph
 *
 * This library is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
!function(n){n.fn.dragjs=function(r,o){return this.each(function(){var i=new dragjs.drop.DropZone(this,o);n.isFunction(r)&&i.drop(r)})}}(jQuery);