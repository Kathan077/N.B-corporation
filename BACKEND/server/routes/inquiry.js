const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Inquiry = require("../models/Inquiry");

// Target recipient email address
const TARGET_EMAIL = process.env.TARGET_EMAIL || "krishnapanchal822006@gmail.com";

// Setup nodemailer transporter helper
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

// @route   POST /api/inquiry
// @desc    Submit quote/order inquiry and send email to nb2corporation@gmail.com
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, mobile, location, selectedProduct, quantity, message, items } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, email, mobile, and message.",
      });
    }

    // 1. Save Inquiry in Database (Fail-Safe Storage)
    const newInquiry = new Inquiry({
      name,
      email,
      mobile,
      location: location || "",
      selectedProduct: selectedProduct || "ALL",
      quantity: quantity ? Number(quantity) : 1,
      message,
      items: Array.isArray(items) ? items : [],
    });

    await newInquiry.save();

    // 2. Build HTML Content for the Email
    const productsHtml =
      Array.isArray(items) && items.length > 0
        ? items
            .map(
              (item, index) => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 12px; font-weight: bold; color: #0f172a;">${index + 1}. ${item.name} ${item.code ? `(3M ${item.code})` : ""}</td>
                <td style="padding: 10px 12px; color: #475569; font-size: 13px;">
                  ${[
                    item.selectedColor ? `Color: ${item.selectedColor}` : "",
                    item.selectedWidth ? `Size: ${item.selectedWidth}` : "",
                    item.selectedLength ? `Length: ${item.selectedLength}` : "",
                    item.selectedVolume ? `Volume: ${item.selectedVolume}` : ""
                  ].filter(Boolean).join(", ") || "Standard"}
                </td>
                <td style="padding: 10px 12px; font-weight: bold; text-align: center; color: #dc2626;">${item.quantity || 1} Units</td>
              </tr>
            `
            )
            .join("")
        : `<tr><td colspan="3" style="padding: 12px; color: #64748b;">Selected: ${selectedProduct || "General Inquiry"} (Qty: ${quantity || 1})</td></tr>`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #1e293b;">
        <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="background: #dc2626; padding: 20px 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 0.5px;">New Quotation & Order Inquiry</h2>
            <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">NB.CORP Elite Engineering Supply Portal</p>
          </div>

          <!-- Customer Info -->
          <div style="padding: 24px; border-bottom: 1px solid #e2e8f0;">
            <h3 style="margin: 0 0 14px; font-size: 15px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Customer Contact Details</h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 140px; font-weight: bold;">Customer Name:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Email:</td>
                <td style="padding: 6px 0; color: #2563eb;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Mobile:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: bold;"><a href="tel:${mobile}" style="color: #0f172a; text-decoration: none;">${mobile}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Location:</td>
                <td style="padding: 6px 0; color: #0f172a;">${location || "Not Provided"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Total Units:</td>
                <td style="padding: 6px 0; color: #dc2626; font-weight: bold;">${quantity || 1} Units</td>
              </tr>
            </table>
          </div>

          <!-- Ordered Products Table -->
          <div style="padding: 24px; border-bottom: 1px solid #e2e8f0;">
            <h3 style="margin: 0 0 14px; font-size: 15px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Requested Items / Products</h3>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #f1f5f9; text-align: left; color: #475569;">
                  <th style="padding: 10px 12px;">Product</th>
                  <th style="padding: 10px 12px;">Specifications</th>
                  <th style="padding: 10px 12px; text-align: center;">Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${productsHtml}
              </tbody>
            </table>
          </div>

          <!-- Customer Message -->
          <div style="padding: 24px; background-color: #f8fafc;">
            <h3 style="margin: 0 0 10px; font-size: 14px; color: #0f172a; text-transform: uppercase;">Message / Requirements:</h3>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</div>
          </div>

          <!-- Footer -->
          <div style="padding: 16px 24px; background: #0f172a; color: #94a3b8; font-size: 11px; text-align: center;">
            <p style="margin: 0;">Inquiry received from NB.CORP Official Portal &bull; Naroda, Ahmedabad, Gujarat</p>
          </div>
        </div>
      </div>
    `;

    // 3. Send Email via Nodemailer if SMTP configured
    const transporter = createTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"NB.CORP Inquiry Portal" <${process.env.EMAIL_USER}>`,
          to: TARGET_EMAIL,
          replyTo: email,
          subject: `[New Quote Inquiry] ${name} - ${quantity || 1} Units`,
          html: emailHtml,
        });
        console.log(`[Email Sent] Inquiry from ${name} sent to ${TARGET_EMAIL}`);
      } catch (mailErr) {
        console.error("[Email Delivery Error]:", mailErr.message);
        // Note: We don't fail the request because the inquiry is already saved in the database
      }
    } else {
      console.log(`[Inquiry Saved] Email credentials not set in .env. Inquiry from ${name} (${email}) saved to Database.`);
    }

    return res.status(201).json({
      success: true,
      message: `Inquiry successfully submitted and recorded for ${TARGET_EMAIL}`,
      inquiryId: newInquiry._id,
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while submitting inquiry. Please try again or contact via WhatsApp.",
    });
  }
});

module.exports = router;
