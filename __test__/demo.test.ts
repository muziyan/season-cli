import {demo,add} from '../src/index';


describe("test demo",()=>{

  it("demo value equal 1",()=>{
    expect(demo()).toBe(1);
  })

  it("num 3 + 2 equal 5",()=>{
    expect(add(3,2)).toBe(5)
  })

})
