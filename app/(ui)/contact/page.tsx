'use client'
import { Box, Flex, Text, TextArea, Button, Heading, Grid, Card, TextField, Select } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LinkedInLogoIcon, TwitterLogoIcon, InstagramLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";
import { PiTiktokLogoLight } from "react-icons/pi";
import { FaDribbble } from "react-icons/fa";
import { useThemeMode } from "@/components/ThemeProvider";
import contactService from "@/services/sedContact";

export default function ContactPage() {
    const { accentColor } = useThemeMode();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        message: '',
        agree: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // console.log('Form submitted:', formData);
        try {
            const response = await contactService.sendContactForm(formData);
            // console.log('Contact form response:', response);
            if (response.success) {

                alert('Thank you for your message! We will get back to you soon.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    country: '',
                    message: '',
                    agree: false
                });
            } else {

                alert('Oops! Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error sending contact form:', error);
            alert('Oops! Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <Box style={{
            background: 'linear-gradient(135deg, var(--gray-1) 0%, var(--gray-2) 100%)',
            // minHeight: '100vh'
        }}>
            <Grid
                columns={{ initial: '1', lg: '2' }}
                gap="8"
                align="start"
                style={{ margin: '0 auto' }}
            >
                {/* Left Column - Contact Form */}
                <Card size="4" style={{
                    background: 'white',
                    border: '1px solid var(--gray-6)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                    <Box px={{ initial: '0', md: '6' }} py={{ initial: '2', md: '5' }}>
                        {/* Header */}
                        <Box mb="6">
                            <Text size="2" weight="bold" style={{
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                display: 'block',
                                marginBottom: '8px',
                                color: `var(--${accentColor}-9)`
                            }}>
                                GET IN TOUCH
                            </Text>
                            <Heading size="7" weight="bold" mt="2" mb="3" style={{ lineHeight: '1.2' }}>
                                Let&apos;s Chat, Reach Out to Us
                            </Heading>
                            <Text size="3" color="gray" style={{ lineHeight: '1.6' }}>
                                Have questions or feedback? We&apos;re here to help. Send us a message, and we&apos;ll respond within 24 hours.
                            </Text>
                        </Box>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit}>
                            {/* Name Fields */}
                            <Flex gap="4" mb="4" style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}>
                                <Box style={{ flex: 1, minWidth: '250px' }}>
                                    <Text as="label" size="2" weight="medium" mb="2" style={{ display: 'block' }}>
                                        First Name
                                    </Text>
                                    <TextField.Root
                                        placeholder="First name"
                                        size='3'
                                        value={formData.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        required
                                    />
                                </Box>
                                <Box style={{ flex: 1, minWidth: '250px' }}>
                                    <Text as="label" size="2" weight="medium" mb="2" style={{ display: 'block' }}>
                                        Last Name
                                    </Text>
                                    <TextField.Root
                                        placeholder="Last name" size='3'
                                        value={formData.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        required
                                    />
                                </Box>
                            </Flex>
                            <Flex gap="4" mb="4" style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}>
                                <Box style={{ flex: 1, minWidth: '250px' }}>
                                    <Text as="label" size="2" weight="medium" mb="2" style={{ display: 'block' }}>
                                        Email Address
                                    </Text>
                                    <TextField.Root
                                        placeholder="Email address"
                                        type="email"
                                        size='3'
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        required
                                    />
                                </Box>
                                <Box style={{ flex: 1, minWidth: '250px' }}>
                                    <Text as="label" size="2" weight="medium" mb="2" style={{ display: 'block' }}>
                                        Country/Region
                                    </Text>
                                    <Select.Root
                                        value={formData.country}
                                        onValueChange={(value) => handleChange('country', value)}
                                        required
                                        size="3"
                                    >
                                        <Select.Trigger
                                            placeholder="Select your country"
                                            style={{ width: '100%' }}
                                        />
                                        <Select.Content>
                                            <Select.Group>
                                                <Select.Label>Asia Pacific</Select.Label>
                                                <Select.Item value="indonesia">Indonesia</Select.Item>
                                                <Select.Item value="singapore">Singapore</Select.Item>
                                                <Select.Item value="malaysia">Malaysia</Select.Item>
                                                <Select.Item value="thailand">Thailand</Select.Item>
                                                <Select.Item value="vietnam">Vietnam</Select.Item>
                                                <Select.Item value="philippines">Philippines</Select.Item>
                                                <Select.Item value="japan">Japan</Select.Item>
                                                <Select.Item value="south-korea">South Korea</Select.Item>
                                                <Select.Item value="china">China</Select.Item>
                                                <Select.Item value="india">India</Select.Item>
                                            </Select.Group>

                                            <Select.Separator />

                                            <Select.Group>
                                                <Select.Label>Middle East</Select.Label>
                                                <Select.Item value="saudi-arabia">Saudi Arabia</Select.Item>
                                                <Select.Item value="uae">United Arab Emirates</Select.Item>
                                                <Select.Item value="qatar">Qatar</Select.Item>
                                            </Select.Group>

                                            <Select.Separator />

                                            <Select.Group>
                                                <Select.Label>Western</Select.Label>
                                                <Select.Item value="australia">Australia</Select.Item>
                                                <Select.Item value="united-kingdom">United Kingdom</Select.Item>
                                                <Select.Item value="united-states">United States</Select.Item>
                                                <Select.Item value="canada">Canada</Select.Item>
                                                <Select.Item value="germany">Germany</Select.Item>
                                                <Select.Item value="france">France</Select.Item>
                                                <Select.Item value="italy">Italy</Select.Item>
                                                <Select.Item value="spain">Spain</Select.Item>
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                </Box>
                            </Flex>

                            {/* Email Field */}


                            {/* Message Field */}
                            <Box mb="5">
                                <Text as="label" size="2" weight="medium" mb="2" style={{ display: 'block' }}>
                                    Message
                                </Text>
                                <TextArea
                                    placeholder="Leave us message"
                                    style={{
                                        minHeight: '120px',
                                        resize: 'vertical'
                                    }}
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    required
                                />
                            </Box>

                            {/* Agreement Checkbox */}
                            <Flex align="start" gap="3" mb="6">
                                <input
                                    type="checkbox"
                                    id="agree"
                                    checked={formData.agree}
                                    onChange={(e) => handleChange('agree', e.target.checked)}
                                    style={{
                                        marginTop: '2px',
                                        width: '16px',
                                        height: '16px'
                                    }}
                                />
                                <Text as="label" htmlFor="agree" size="2" color="gray" style={{ lineHeight: '1.4', cursor: 'pointer' }}>
                                    I agree to our friendly privacy policy
                                </Text>
                            </Flex>

                            {/* Submit Button */}
                            <Button
                                size="3"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    height: '48px',
                                    backgroundColor: `var(--${accentColor}-9)`,
                                    color: 'white',
                                    opacity: loading ? 0.7 : 1,
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                                type="submit"
                                variant="classic"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Flex align="center" gap="2">
                                        <ReloadIcon className="animate-spin" />
                                        Sending...
                                    </Flex>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </form>
                    </Box>
                </Card>

                {/* Right Column - Contact Info & Image */}
                <Flex direction="column" gap="6" style={{ height: '100%' }}>
                    {/* Contact Image */}
                    <Card size="4" style={{
                        background: 'white',
                        border: '1px solid var(--gray-6)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        flex: 1,
                        padding: '0'
                    }}>
                        <Box style={{
                            position: 'relative',
                            height: '400px',
                            overflow: 'hidden',
                            borderRadius: 'var(--radius-3)'
                        }}>
                            <Image
                                src="https://glints.com/id/lowongan/wp-content/uploads/2022/04/cara-mengambil-foto-profesional-2.jpg"
                                alt="Professional Contact"
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                                priority
                            />
                        </Box>
                    </Card>

                    {/* Contact Information */}
                    <Card size="4" style={{
                        background: 'white',
                        border: '1px solid var(--gray-6)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}>
                        <Box px={{ initial: '0', md: '6' }} py={{ initial: '2', md: '5' }}>
                            <Heading size="5" weight="bold" mb="5">
                                Contact Information
                            </Heading>

                            {/* Email */}
                            <Flex gap="3" align="center" mb="4">
                                <Box
                                    style={{
                                        background: 'var(--blue-3)',
                                        padding: '10px',
                                        borderRadius: 'var(--radius-3)',
                                        color: 'var(--blue-9)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <EnvelopeClosedIcon width="18" height="18" />
                                </Box>
                                <Box style={{ flex: 1 }}>
                                    <Text size="3" weight="medium" style={{ letterSpacing: '0.5px' }}>
                                        andri.dev.code@gmail.com
                                    </Text>
                                </Box>
                            </Flex>

                            {/* Phone */}
                            <Flex gap="3" align="center" mb="5">
                                <Box
                                    style={{
                                        background: 'var(--green-3)',
                                        padding: '10px',
                                        borderRadius: 'var(--radius-3)',
                                        color: 'var(--green-9)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <FiPhone width="18" height="18" />
                                </Box>
                                <Box style={{ flex: 1 }}>

                                    <Text size="3" weight="medium" style={{ letterSpacing: '0.5px' }}>
                                        +62 812 4919 2305
                                    </Text>
                                </Box>
                            </Flex>

                            {/* Social Media */}
                            <Box>
                                <Text size="2" weight="medium" color="gray" mb="3">
                                    Follow Us
                                </Text>
                                <Flex gap="3">
                                    <Button
                                        variant="outline"
                                        size="2"
                                        style={{
                                            padding: '8px',
                                            borderRadius: 'var(--radius-2)'
                                        }}
                                        asChild
                                    >
                                        <a href="#" style={{ textDecoration: 'none' }}>
                                            <LinkedInLogoIcon width="18" height="18" />
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="2"
                                        style={{
                                            padding: '8px',
                                            borderRadius: 'var(--radius-2)'
                                        }}
                                        asChild
                                    >
                                        <a href="#" style={{ textDecoration: 'none' }}>
                                            <GitHubLogoIcon width="18" height="18" />
                                        </a>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="2"
                                        style={{
                                            padding: '8px',
                                            borderRadius: 'var(--radius-2)'
                                        }}
                                        asChild
                                    >
                                        <a href="#" style={{ textDecoration: 'none' }}>
                                            <InstagramLogoIcon width="18" height="18" />
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="2"
                                        style={{
                                            padding: '8px',
                                            borderRadius: 'var(--radius-2)'
                                        }}
                                        asChild
                                    >
                                        <a href="#" style={{ textDecoration: 'none' }}>
                                            <PiTiktokLogoLight width="18" height="18" />
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="2"
                                        style={{
                                            padding: '8px',
                                            borderRadius: 'var(--radius-2)'
                                        }}
                                        asChild
                                    >
                                        <a href="#" style={{ textDecoration: 'none' }}>
                                            <FaDribbble width="18" height="18" />
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="2"
                                        style={{
                                            padding: '8px',
                                            borderRadius: 'var(--radius-2)'
                                        }}
                                        asChild
                                    >
                                        <a href="#" style={{ textDecoration: 'none' }}>
                                            <TwitterLogoIcon width="18" height="18" />
                                        </a>
                                    </Button>
                                </Flex>
                            </Box>
                        </Box>
                    </Card>
                </Flex>
            </Grid>
        </Box>
    );
}