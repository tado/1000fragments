uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.88 * sin(mf + 3.0) + ph), cos(t * 2.33 * cos(mf + 3.0) + ph));
        ms += 0.023 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 2.28, t * 2.64)) - 0.5) * 0.94;
    v = exp(-abs(bx) * 6.72) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.12;
	p = rot2(p.y * 1.96 + (time * 0.65) * 0.81) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.76, lr * 1.14 + (time * 0.65) * 0.64); }
	p = (floor(p * 26.8) + 0.5) / 26.8;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.44; p = rot2(0.88) * p; }
	float d1 = field(p, (time * 0.65), 0.0);
	float d2 = field2(p, (time * 0.65), 1.28);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.78 + (time * 0.65) * 0.10, vec3(0.31, 0.28, 0.29), vec3(0.21, 0.27, 0.24), vec3(0.55, 0.53, 0.47), vec3(0.71, 0.38, 0.40));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(0.928, 0.989, 1.060) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
