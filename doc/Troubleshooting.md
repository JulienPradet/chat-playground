# Troubleshooting

If by any means you are crazy enough to give a try at this solution, you may come accross some recurring errors. Here are the ones that I came accross and am willing to document.

## Forms

In case you are controlling your form values, make sure to call the callback that sets the form value first.

```js
const { values$, handlers } = Form({
    message: ''
});

return values$.flatMap((values) => {
    return dom.input(
        {
            name: 'message',
            value: values.message,
            onkeydown: (event) => {
                // update the values stream
                handlers.setValueFromEvent(event)

                // only then you can do something else
                otherHandler()
            }
        }
    )
})
```

That's because there is no batching of the virtual dom update for now.