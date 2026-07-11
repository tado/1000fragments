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
    vec2 wq = vec2(vnoise2(p * 2.24 + ph), vnoise2(p * 2.24 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.24 + 3.60 * wq + vec2(1.7, 9.2) + t * 0.44),
                   vnoise2(p * 2.24 + 3.25 * wq + vec2(8.3, 2.8) - t * 1.01));
    v = vnoise2(p * 2.24 + 1.82 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.88;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 16.01 - t * 1.07 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	p = rot2(length(p) * 3.57 + time * 1.12) * p;
	p += vec2(0.07, -0.34) * sin(length(p) * 5.67 - time * 2.49) * 0.22;
	{ p = vec2(atan(p.y, p.x) * 1.85, length(p) * 4.96 - time * 0.34); }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.30 + time * 0.09, vec3(0.43, 0.47, 0.55), vec3(0.46, 0.38, 0.39), vec3(1.36, 0.71, 0.86), vec3(0.38, 0.51, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
