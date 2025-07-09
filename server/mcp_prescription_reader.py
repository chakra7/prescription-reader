import base64
from mcp.server.fastmcp import FastMCP
from lib.prescription_reader import PrescriptionReader

mcp = FastMCP("prescription_reader")

@mcp.tool()
def read_prescription(prescription: str) -> str:
    """
    Reads a prescription image and returns the text in CSV format.
    
    Args:
        prescription (str): Base64 encoded image of the prescription.
        
    Returns:
        str: Text extracted from the prescription in CSV format.
    """
    print('running read_prescription')
    #image_bytes = base64.b64decode(prescription)
    prescription_reader = PrescriptionReader()
    return prescription_reader.convert_image_to_text(prescription)

if __name__ == "__main__":
    # Initialize and run the server
    print('running mcp server')
    mcp.run(transport='stdio')