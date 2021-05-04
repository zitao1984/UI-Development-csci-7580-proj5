import Thread from "../Thread";
import renderer from "react-test-renderer";

const morckThread =
    {
        id: "mike",
        message: "haha",
        post_time: 1617686046238,
        tags: ["break"],
        thread_id: "1BHN9NL2tqRgHOxNbJja",
        title: "linebreak"
    }

test("The single thread render",()=>{
    const component = renderer.create(
        <Thread thread={morckThread}/>
    )

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
