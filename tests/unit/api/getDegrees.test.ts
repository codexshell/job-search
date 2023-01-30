import axios from "axios";

jest.mock("axios", () => ({
  get: jest.fn(),
}));
const axiosGetMock = axios.get as jest.Mock;

import getDegrees from "@/api/getDegrees";

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: "Master's",
        },
      ],
    });
  });

  it("fetches all possible degree requirements", async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalled();
  });

  it("extracts degrees from response", async () => {
    const data = await getDegrees();
    expect(data).toEqual([
      {
        id: 1,
        degree: "Master's",
      },
    ]);
  });
});
