const sum=require("./sum")

it("should add", () => {
    const result = sum(1,2);
    expect(result).toBe(3)
})