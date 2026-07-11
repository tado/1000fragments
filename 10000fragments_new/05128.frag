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
    vec2 kp = p * 2.50;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.70; kp = rot2(2.25) * kp; kp *= 1.32; }
    v = sin(kp.y * 1.46 - t * 2.33 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.70);
    float gsh = hash21(vec2(grow, floor(t * 3.41))) - 0.5;
    float gx = p.x + gsh * 0.63;
    v = sin(gx * 18.19 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.63));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	p *= 1.65;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -1.28 + time * 1.41) * p;
	{ p = vec2(atan(p.y, p.x) * 1.19, length(p) * 5.14 - time * 0.48); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.55);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.61 + time * 0.06, vec3(0.52, 0.45, 0.54), vec3(0.47, 0.32, 0.48), vec3(1.03, 0.71, 0.75), vec3(0.62, 0.31, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
