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
    vec2 kp = p * 1.12;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.76; kp = rot2(2.61) * kp; kp *= 1.24; }
    v = sin(kp.x * 3.38 - t * 3.83 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.22 + ph), vnoise2(p * 3.22 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.22 + 1.63 * wq + vec2(1.7, 9.2) + t * 0.89),
                   vnoise2(p * 3.22 + 1.20 * wq + vec2(8.3, 2.8) - t * 0.85));
    v = vnoise2(p * 3.22 + 2.94 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.09;
	p = rot2(1.24) * p;
	{ p = vec2(atan(p.y, p.x) * 1.16, length(p) * 4.68 - time * 0.52); }
	{ float fr = length(p); p *= 1.0 + -0.69 * fr * fr; }
	p *= 1.0 + 0.20 * sin(time * 3.33);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.16);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.37 + time * 0.14, vec3(0.42, 0.58, 0.48), vec3(0.40, 0.47, 0.44), vec3(1.22, 0.82, 1.28), vec3(0.33, 0.85, 0.40));
	col = fract(col * 1.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
