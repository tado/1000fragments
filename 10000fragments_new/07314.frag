uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 3.35 * sin(t * 0.65) + t * 1.06 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.91);
    float gsh = hash21(vec2(grow, floor(t * 3.86))) - 0.5;
    float gx = p.x + gsh * 0.47;
    v = sin(gx * 13.65 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.19));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * 2.37 + time * 0.46) * p;
	p += vec2(-0.77, 0.03) * sin(length(p) * 3.48 - time * 1.04) * 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = d1 * d2;
	vec3 col = palette(d * 1.48 + time * 0.02, vec3(0.59, 0.56, 0.53), vec3(0.32, 0.50, 0.41), vec3(0.96, 1.38, 1.12), vec3(0.21, 0.39, 0.74));
	col = mod(col * 1.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
