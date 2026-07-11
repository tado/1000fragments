uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.88 + t * 1.51 + ph) * 0.7;
    float wb = sin(p.y * 9.54 - t * 3.72 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.64;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.10);
    float gsh = hash21(vec2(grow, floor(t * 8.45))) - 0.5;
    float gx = p.x + gsh * 1.09;
    v = sin(gx * 13.65 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.26));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.17) - 0.5;
	p += vec2(0.29, 0.82) * sin(length(p) * 3.76 - time * 1.92) * 0.29;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.93);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.68 + time * 0.08, vec3(0.57, 0.56, 0.46), vec3(0.35, 0.46, 0.38), vec3(0.93, 1.16, 1.06), vec3(0.60, 0.54, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
