## tabs.js

Some really nice looking javascript tabs.

## Demo

There is no formal demo at this time. To see these tabs in action, you can download Subtext Editor, the app for which they were written, [here](https://chrome.google.com/webstore/detail/subtext-editor/ghfooiajeobmcfhmajcblmompfdehnli).

## Usage

Just include the javascript and css in your html, and initiate the tabs like so:

```javascript
var tabs = new Tabs({
	shell: $('.tabs'),
	minWidth: 45,
	maxWidth: 180
});
```

Replace ```.tabs``` with the selector of your choosing. This is where the tabs will live. You can create multiple tabs instances at different selectors. They can not, at this time, interact with each other, but they will both work.

Initiating tabs automatically adds a tab. To add more tabs, do this:

```javascript
var tab = tabs.add({title: 'This is a tab'});
```

Width of the tabs is based on their title. They will respect maxWidth, but will be smaller if they can be. If you add too many tabs, they will start to shrink to fit the width of the tab bar. Their titles will shrink too.

## Events
#### activate

When a tab becomes active, it will trigger an 'activate' event. You can bind to that event like this:

```javscript
tab.on('activate', function(){
  // do something
});
```

#### close

This happens when the user tries to close the tab by clicking on the close button. The tab will not actually close when this happens! Instead, the tab will trigger a 'close' event, and let you handle it. This is useful in case you want to check something and then close or not close, such as closing a file with unsaved changes. You can bind to the event like this:

```javascript
tab.on('close', function(){
  // do something
});
```

If you want to close the tab after all, you can do it manually like this:

```javascript
tabs.closeTab(tab);
```

## API

#### Add a tab
```javascript
var tab = tabs.add({title: 'Title'});
```

The returned tab is a jQuery object of the tab node, so you can do anything to it that you could with any other jQuery object. You can also bind to the events 'activate' and 'close'.

#### Set a tab as the active tab
```javascript
tabs.setCurrent(tab);
```

#### Close a tab
```javascript
tabs.closeTab(tab);
```

#### Update a tab
```javascript
tabs.updateTab(tab, {title: 'New Title'});
```

### Contributing

Pull requests to this repository are welcome.

### Roadmap

There are a lot of things I'd like to improve about this function.

1. Tabs should have their own prototype instead of being passted into the Tabs object. That means ```tabs.setCurrent(tab);``` would become ```tab.setCurrent();```
2. Tabs should maybe not be jQuery objects of the tab itself.
3. Ability for multiple tabs instances to be able to drag and drop into each other.

Also, a demo page for this repository.

### See also

This function is a heavily modified fork of [chrome-tabs](https://github.com/adamschwartz/chrome-tabs) by [Adam Schwartz](https://github.com/adamschwartz). Many things have been changed from his version, but credit goes to him for the original code.
