uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.25 * cos(sa * 6 + t * 0.81 + ph);
    v = sin((sr - petal) * 13.76);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.19 * cos(sa * 9 + t * 0.58 + ph);
    v = sin((sr - petal) * 8.11);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.19, length(p) * 3.00 - time * 0.60); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.40; p = rot2(1.27) * p; }
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.55);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.22 + time * 0.15, vec3(0.51, 0.52, 0.55), vec3(0.42, 0.49, 0.39), vec3(0.77, 1.18, 1.37), vec3(0.64, 0.12, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
