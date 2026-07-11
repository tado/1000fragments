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
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.45 + ph), vnoise2(p * 4.45 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.45 + 3.73 * wq + vec2(1.7, 9.2) + t * 0.51),
                   vnoise2(p * 4.45 + 1.85 * wq + vec2(8.3, 2.8) - t * 0.59));
    v = vnoise2(p * 4.45 + 2.47 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.90;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.45; kp = rot2(2.72) * kp; kp *= 1.15; }
    v = sin(kp.x * 2.08 - t * 1.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	p = rot2(2.17) * p;
	p = rot2(p.y * 2.32 + time * 1.10) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.05, lr * 1.93 + time * -0.43); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.57; p = rot2(2.43) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.89 + time * 0.24, vec3(0.59, 0.48, 0.58), vec3(0.44, 0.39, 0.35), vec3(0.96, 1.33, 0.79), vec3(0.17, 0.42, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
