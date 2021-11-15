/*
 * Module
 */
let wasEnabled;
export default function _popups(enabled) {
  console.log('loaded _popups');
  // reload the page
  // when value changes from TRUEthy to FALSEy because things on the page have been modified
  if (wasEnabled === true && enabled === false) {
    window.location.reload();
    return;
  }
  wasEnabled = enabled;

  // do the things
  hidePopupsAndAds();
  setTimeout(hidePopupsAndAds, 1000);
  setTimeout(hidePopupsAndAds, 3000);
  setTimeout(hidePopupsAndAds, 5000);
}

/*
 * Lib
 */

function is_gif_image(i) {
  return /^(?!data:).*\.gif/i.test(i.src);
}

function freeze_gif(i) {
  let c = document.createElement('canvas');
  let w = (c.width = i.width);
  let h = (c.height = i.height);
  c?.getContext('2d')?.drawImage(i, 0, 0, w, h);
  try {
    i.src = c.toDataURL('image/gif'); // if possible, retain all css aspects
  } catch (e) {
    // cross-domain -- mimic original with all its tag attributes
    for (let j = 0, a; (a = i.attributes[j]); j++) c.setAttribute(a.name, a.value);
    i.parentNode.replaceChild(c, i);
  }
}

function hideEl(el, because = '', force = false) {
  if (!force) {
    if (
      el._width > Math.max(410, window.innerWidth / 3) &&
      el._height > Math.max(410, window.innerHeight / 3)
    ) {
      return;
    }
  }
  el.style.setProperty('display', 'none', 'important');
  el.style.setProperty('opacity', '0', 'important');
  el.style.setProperty('visibility', 'hidden', 'important');
  el.style.setProperty('pointer-events', 'none', 'important');
}

function invisibleEl(el, because = '') {
  el.style.setProperty('opacity', '0', 'important');
  el.style.setProperty('visibility', 'hidden', 'important');
  el.style.setProperty('pointer-events', 'none', 'important');
}

function hidePopupsAndAds() {
  console.warn('Kill popups and ads on page...');
  let DEBUG1 = false; // which stuff to hide/show
  let DEBUG2 = false; // localStorage/indexDB
  let DEBUG3 = false; // buttons inside cookie banner
  let DEBUG4 = false; // buttons inside cookie banner - advanced

  /*
   * FREEZE GIFs
   */
  [].slice.apply(document.images).filter(is_gif_image).map(freeze_gif);

  /*
   * Remove animated (gif) favicons
   */
  // let favicon = document.querySelector('link[rel*="icon"]')
  // if (DEBUG1) console.log('favicon',favicon)
  // .href = "//placehold.it/32/F00"

  /*
   * 1) Iterate every DOM element.
   * 2) Detect evil elements, to mark for removal.
   * 3) Remove them, or just hide. Not sure yet.
   */
  let elems = window.document.body.getElementsByTagName('*');
  let len = elems.length;
  for_each_element: for (let i = 0; i < len; i++) {
    let el = elems[i];
    if (!('className' in el) || !('innerText' in el)) {
      continue;
    }
    // let el = document.querySelector('')
    el._css = window.getComputedStyle(el, null);
    el._class = el.className.toLowerCase();

    /*
     * el already hidden: no need to hide again
     */
    if (el._css.display === 'none' || !el._css.height) {
      continue;
    }

    /*
     * FIX WEIRD .listbuilder-popup (LEFTOVER OVERLAY) BUG
     */
    let le = document.querySelector('.listbuilder-popup-open');
    if (le) {
      le.classList.remove('listbuilder-popup-open');
    }

    /*
     * REMOVE GIPHY
     */
    if (el.tagName === 'IFRAME') {
      if (el.src.includes('giphy')) {
        invisibleEl(el, 'giphy iframe');
        continue;
      }
    }

    /*
     *
     * FIXED/STATIC
     *
     */
    if (el._class.includes('fancybox')) {
      hideEl(el, 'fancybox', true);
    }

    /*
     *
     * FIXED/STATIC
     *
     */
    if (el._css.position === 'fixed' || el._css.position === 'sticky') {
      el._css = window.getComputedStyle(el, null);
      el._id = (el.id || '').toLowerCase();
      el._class = (el.className ? el.className.toString() : '').toLowerCase();
      el._innerText = el.innerText
        ? el.innerText
            .substr(0, 150)
            .replace(/[^\w]+/g, '')
            .toLowerCase()
        : '';
      el._paddingSides =
        Number((el._css.paddingLeft || '').replace(/[^\d.]+/g, '')) +
        Number((el._css.paddingRight || '').replace(/[^\d.]+/g, ''));
      el._paddingTop =
        Number((el._css.paddingTop || '').replace(/[^\d.]+/g, '')) +
        Number((el._css.paddingBottom || '').replace(/[^\d.]+/g, ''));
      el._height =
        (el._css.height ? Number(el._css.height.replace(/[^0-9]/g, '')) : 0) + el._paddingTop;
      el._width =
        (el._css.width ? Number(el._css.width.replace(/[^0-9]/g, '')) : 0) + el._paddingSides;
      el._bottom =
        Number((el._css.getPropertyValue('bottom') || '').replace(/[^\d.]+/g, '')) +
        Number((el._css.marginBottom || '').replace(/[^\d.]+/g, ''));
      el._right =
        Number((el._css.getPropertyValue('right') || '').replace(/[^\d.]+/g, '')) +
        Number((el._css.marginRight || '').replace(/[^\d.]+/g, ''));
      el._top =
        Number((el._css.getPropertyValue('top') || '').replace(/[^\d.]+/g, '')) +
        Number((el._css.marginTop || '').replace(/[^\d.]+/g, ''));
      el._buttons = el.querySelectorAll('button');
      el._buttons_and_links = [
        ...el.querySelectorAll('a'),
        ...el._buttons,
        ...el.querySelectorAll('[data-action]'),
        ...[...el.querySelectorAll('*')].filter((el) => {
          let _class = ((el.className || '') + (el.id || '')).toLowerCase();
          return _class.includes('button') || _class.includes('btn');
        }),
      ];
      /*
       * detect if "cookie" consent banner
       */
      el._is_cookies = (el._innerText + el._class + el._id).includes('cookie');
      el._iframes = el.querySelectorAll('iframe');
      /*
       * detect if "newsletter signup"
       */
      el._inputs = el.querySelectorAll('input[type="text"]');
      if (el._innerText.includes('email') || el._innerText.includes('signup')) {
        el._is_newsletter = true;
      }
      for (let eli of el._inputs) {
        if (eli.parentElement.outerHTML.includes('email')) {
          el._is_newsletter = true;
          break;
        }
      }

      /*
       * ------------------------------------------- ALLOW HEADER AND NAV -------------------------------------------
       */

      /*
       *
       * ALLOW FIXED HEADER
       * ALLOW FIXED TO TOP 0 (LIKE HEADER MIGHT BE)
       * ALLOW TOP NAV LINKS
       *
       */
      if (!el._is_cookies) {
        if (
          el.tagName === 'HEADER' ||
          el._class.includes('head') ||
          (el._top === 0 && el._right === 0 && el._height <= 200)
        ) {
          continue;
        }
        if (el.dataset) {
          for (let key in el.dataset) {
            if (el.dataset[key].includes('head')) {
              continue for_each_element;
            }
          }
        }
      }
      if (el._top < 50 && el._width < 300) {
        continue;
      }

      /*
       * ------------------------------------------ REMOVE GARBAGE - BELOW ------------------------------------------
       */

      /*
       * is an iframe less than 200px tall!
       * -
       * that is too sneaky. No external page < 200px is up to any good
       */
      if (el.tagName === 'IFRAME') {
        if (el._height < 200) {
          hideEl(el, 'element is or contains iframe < 200px tall', true);
          continue;
        }
      }

      /*
       * is advertisement!
       */
      if (
        // called "ad" in className or id
        el._class.substr(0, 3) === 'ad-' ||
        el._class.includes('-ad-') ||
        el.id.includes('-ad-') ||
        el.id.includes('_ad_') ||
        el.id.includes('_ads_') ||
        (el.className.match && el.className.match(/Ad[A-Z]+/)) ||
        (el.id.match && el.id.match(/Ad[A-Z]+/))
      ) {
        // remove!
        hideEl(el, 'is advertisement className/id', true);
        continue;
      }
      // is bottom floating advertisement
      if (el._bottom === 0 && el._width === window.width && el._innerText.length < 20) {
        el._is_ad = true;
      }

      /*
       * is notification!
       */
      if (el._class.includes('notification')) {
        // remove!
        hideEl(el, 'is notification className');
        continue;
      }

      /*
       * is notification!
       */
      if (el._class.includes('subscribe')) {
        // remove!
        hideEl(el, 'is subscribe className');
        continue;
      }

      /*
       * is google sign in - intrusive!
       */
      if (el.id === 'credential_picker_container') {
        // remove!
        hideEl(el, 'is credential_picker_container id');
        continue;
      }

      /*
       * site ad
       * -
       * if very narrow, and has some call to action
       */
      if (el._height < 100 && el._innerText.includes('$')) {
        // remove!
        hideEl(el, 'height < 100 and innerText includes "$"');
        continue;
      }

      /*
       * is ad popup
       */
      if (el._class.includes('popup')) {
        // remove!
        hideEl(el, 'is class="popup"');
        continue;
      }

      /*
       * is pay wall
       */
      if (el._class.includes('paywall')) {
        // remove!
        hideEl(el, 'is pay wall');
        document.body.style.overflow = 'auto';
        let body_children = [...document.body.querySelectorAll('> div')];
        if (body_children.length < 5) {
          for (let elb of body_children) {
            elb.style.overflow = 'auto';
          }
        }
        continue;
      }

      /*
       * IFRAME
       * -
       * remove entire element if contains unwanted iframe
       */
      for (let elb of el._iframes) {
        let elb_height = el._css.height ? Number(el._css.height.replace(/[^0-9]/g, '')) : 0;
        if (elb_height < 300) {
          hideEl(el, 'contains shallow iframe');
        }
      }

      /*
       * CLICK NON-FIXED CHILD BUTTON of fixed banner/popup
       * -
       * "X", "continue", "accept", etc
       */
      if (el._is_cookies) {
        if (DEBUG3) console.log('el._is_cookies buttons', el._buttons_and_links);
      }
      let bi = -1;
      for (let elb of el._buttons_and_links.reverse()) {
        bi++;
        let click_always = ['gotit', 'maybelater'];
        let click_no = ['maybelater', 'dismiss', 'nothanks', 'notnow'];
        let click_yes = [
          'gotit',
          'iaccept',
          'closeandaccept',
          'acceptandclose',
          'acceptallcookies',
          'acceptclose',
          'continue',
          'ok',
          'yes',
          'accept',
          'allowcookies',
          'acceptcookies',
          'thanks',
          'agree',
          'yesimhappy',
        ];
        let elb_class = (elb.className || '').toLowerCase();
        let elb_id = (elb.id || '').toLowerCase();
        let elb_title = elb.title ? elb.title.toLowerCase() : '';
        let elb_innerText = (elb.innerText || elb.value || '')
          .substring(0, 100)
          .toLowerCase()
          .replace(/[^\w×]+/g, '');
        let elb_innerHTML = (elb.innerHTML || '').substring(0, 300).toLowerCase();
        let elb_texts = elb_innerText + ' ' + elb_class + ' ' + elb_id + ' ' + elb_title;
        if (DEBUG3) console.log('--- --- ' + bi + ' button text', elb_texts);
        if (DEBUG4) console.log('--- --- ' + bi + ' button HTML', elb_innerHTML);

        // if about cookies, CLICK YES
        if (el._is_cookies) {
          if (click_yes.includes(elb_innerText)) {
            if (DEBUG3) console.error('--- clicked exact [click_yes] COOKIES', elb_texts);
            elb.click();
            continue;
          }
        }
        // if possible, CLICK NO
        if (click_no.includes(elb_innerText)) {
          if (DEBUG3) console.error('--- clicked exact [click_no]', elb_texts);
          elb.click();
          continue;
        }
        // if is promotion, CLICK SOMETHING TO GET RID OF IT
        if (el._is_cookies || el._is_newsletter || el._is_ad) {
          if (elb_texts.includes('agree')) {
            if (DEBUG3) console.error('--- clicked includes "agree / nothanks" COOKIES', elb_texts);
            elb.click();
            continue;
          }
          // if [X] button
          if (
            elb_innerText === 'close' ||
            elb_innerText === 'x' ||
            elb_innerText === '×' ||
            (elb.ariaLabel || '').toLowerCase().includes('close')
          ) {
            // hideEl(el, '"X" "close" button')
            if (DEBUG3) console.error('--- clicked text === "x / close"', elb_texts);
            elb.click();
            continue;
          }
          // if className mentions
          if (elb_texts.includes('dismiss') || elb_texts.includes('close')) {
            // hideEl(el, '"dismiss" button')
            if (DEBUG3) console.error('--- clicked texts includes "dismiss / close"', elb_texts);
            elb.click();
            continue;
          }
          // if inner HTML contains "close" - such as an alt="" img attribute
          if (elb_innerHTML.includes('close')) {
            // hideEl(el, '"dismiss" button')
            if (DEBUG3) console.error('--- clicked html includes "close"', elb_innerHTML);
            elb.click();
            continue;
          }
        }

        // if some prompt that is easy to predict - always safe to click
        if (click_always.includes(elb_innerText)) {
          if (DEBUG3) console.error('--- clicked exact [click_always] COOKIES', elb_texts);
          elb.click();
          continue;
        }
        // // if definitely cookie banner
        // if ((el._width<500 || el._height<200) && el.innerText.length<200) {
        //   if (elb.tagName === 'BUTTON' && el._buttons.length<=2) {
        //     // click every button! if total upto 2 buttons
        //     if (DEBUG3) console.error('--- clicked every button/link inside ', elb_innerHTML)
        //     elb.click()
        //   }
        // }
      }
    }
  }
}
