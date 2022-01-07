import asyncio
from ariadne import convert_kwargs_to_snake_case, SubscriptionType

from store import queues,total_data

subscription = SubscriptionType()


@subscription.source("messages")
@convert_kwargs_to_snake_case
async def messages_source(obj, info):
    queue = asyncio.Queue()
    queues.append(queue)
    try:
        while True:
            print('listen')
            message = await queue.get()
            # print(message)
            queue.task_done()
            yield message
    except asyncio.CancelledError:
        queues.remove(queue)
        raise


@subscription.field("messages")
@convert_kwargs_to_snake_case
async def messages_resolver(message, info):
    return total_data