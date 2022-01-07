from ariadne import ObjectType, convert_kwargs_to_snake_case

from store import messages, queues,total_data

mutation = ObjectType("Mutation")


@mutation.field("postMessage")
@convert_kwargs_to_snake_case
async def resolve_post_message(obj, info, user, content):
    try:
        message = {
            "id": len(messages)+1,
            "user": user,
            "content": content
        }
        messages.append(message)
        total_data.append(messages[-1])
        # print(total_data)
        for queue in queues:
            await queue.put(message)
        # print(messages)
        return message
    except Exception as error:
        return {
            "success": False,
            "errors": [str(error)]
        }