const directive = {
    mounted(el, binding) {
        const props = binding.value || {}
        const parent = el.parentElement || document.body
        const parentRect = parent.getBoundingClientRect()
        const parentStyle = getComputedStyle(parent)
        const parentPadding = {
            top: parseFloat(parentStyle.getPropertyValue('padding-top')),
            left: parseFloat(parentStyle.getPropertyValue('padding-left'))
        }

        let startX,
            startY,
            scale = 1,
            startScale,
            startDistance,
            moveX = 0,
            moveY = 0,
            maxMoveX,
            maxMoveY = {},
            startMoveX,
            startMoveY,
            expired = true,
            moving = false,
            zooming = false,
            minZoom = props.minZoom || 0.9,
            maxZoom = props.maxZoom || 1.5
        el.addEventListener('touchstart', onTouchStart)
        el.addEventListener('touchmove', onTouchMove)
        el.addEventListener('touchend', onTouchEnd)

        function onTouchStart(event) {
            const { touches } = event
            // console.log(touches[0])
        
            if (touches.length === 1 && scale !== 1) {
                startMove(event)
            } else if (touches.length === 2) {
                startZoom(event)
            }
        }
        
        function startMove(event) {
            const { currentTarget, touches } = event
            const el = currentTarget
            const rect = el.getBoundingClientRect()
        
            startX = touches[0].clientX
            startY = touches[0].clientY
        
            moving = true
            zooming = false
            moveX = moveX === 0 ? parentPadding.left : moveX
            moveY = moveY === 0 ? parentPadding.top : moveY
            startMoveX = moveX
            startMoveY = moveY

            if (expired) {
                const topGap = parentRect.y - rect.y
                maxMoveX = (rect.width - parentRect.width) / 2 + parentPadding.left
                maxMoveY.max = topGap + parentPadding.top
                maxMoveY.min = -(rect.height - topGap - parentRect.height + parentPadding.top)
                expired = false

                console.log('rect:', JSON.stringify(rect))
                console.log('parentRect:', JSON.stringify(parentRect))
                console.log('maxMoveY.min: ', maxMoveY.min)
                console.log('maxMoveY.max: ', maxMoveY.max)
            }
        }
        
        function startZoom(event) {
            expired = true
            moving = false
            zooming = true
            startScale = scale
            startDistance = getDistance(event.touches)
        }
        
        function onTouchMove(event) {
            if (!moving && !zooming) return

            const { touches } = event
            if (moving || zooming) {
                preventDefault(event, true)
            }
        
            if (moving) {
                const touch = touches[0]
                const deltaX = touch.clientX - startX
                const deltaY = touch.clientY - startY
                const _moveX = deltaX + startMoveX
                const _moveY = deltaY + startMoveY
                moveX = range(_moveX, -maxMoveX, maxMoveX)
                moveY = range(_moveY, maxMoveY.min, maxMoveY.max)
            }
        
            if (zooming && touches.length === 2) {
                const distance = getDistance(touches)
                const _scale = (startScale * distance) / startDistance
                scale = range(_scale, minZoom, maxZoom)
            }
        
            render()
        }
        
        function onTouchEnd(event) {
            if (!moving && !zooming) return
        
            let stopPropagation = true
        
            if (moving && startMoveX === moveX && startMoveY === moveY) {
                stopPropagation = false
            }
            
            if (!event.touches.length) {
                moving = false
                zooming = false
                startMoveX = 0
                startMoveY = 0
                startScale = 1

                if (scale < 1) {
                    resetScale()
                    render()
                }
            }
        
            if (stopPropagation) {
                preventDefault(event, true)
            }
        }

        function resetScale() {
            scale = 1
            moveX = 0
            moveY = 0
        }
        
        function render() {
            requestAnimationFrame(() => {
                el.style.transformOrigin = 'center top'
                el.style.transition = (zooming || moving) ? '' : '.3s all'

                const translateX = Number(moveX / scale).toFixed(2)
                const translateY = Number(moveY / scale).toFixed(2)

                el.style.transform = [
                    `scale3d(${scale}, ${scale}, 1)`,
                    `translate(${translateX}px, ${translateY}px)`
                ].join(' ')
            })
        }
    },
    install(app) {
        app.directive('zoom', directive)
    }
}

function getDistance(touches) {
    return Math.sqrt(
        Math.abs(
            (touches[0].clientX - touches[1].clientX) *
                (touches[0].clientY - touches[1].clientY)
        )
    )
}

/**
 * 如果 num 在区间中，返回自身；否则返回下限或上限
 */
function range(num, min, max) {
    return Math.min(Math.max(num, min), max)
}

function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault()
    }

    if (isStopPropagation) {
        event.stopPropagation()
    }
}

export default directive
