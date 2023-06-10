/ SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

interface IERC721{
   function safeMint(address to, string memory uri) external;
}


contract APIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public volume;
    bytes32 private jobId;
    uint256 private fee;
    mapping (bytes32=> address) private request_owner;
    IERC721 private nft_contract;

    event RequestImage(bytes32 indexed requestId, string url, address to);
    event ResponsetImage(bytes32 indexed requestId, string url, address to);

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x40193c8518BB267228Fc409a613bDbD8eC5a97b3);
        jobId = "7d80a6386ef543a3abb52817f6707e3b";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
        nft_contract = IERC721(0x688AD198f4eF501096b75e75f7f2039aBcC2DD8B);
    }

    /**
     * example url prompt https://imagenIA.com/create?prompt=dogs%20and%20cats
     * 
     */
    function requestImage(string memory url_with_prompt, address to) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // Set the URL to perform the GET request on
        req.add(
            "get",
            url_with_prompt
        );
  
        req.add("path", "url"); 

        bytes32 id_request = sendChainlinkRequest(req, fee);
        request_owner[id_request] = to;

        emit RequestImage(id_request, url_with_prompt, to);

        return id_request;
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(
        bytes32 _requestId,
        string memory urlRequest
    ) public recordChainlinkFulfillment(_requestId) {
        address to = request_owner[_requestId];
        nft_contract.safeMint(to, urlRequest);
        emit ResponsetImage(_requestId, urlRequest, to);
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
