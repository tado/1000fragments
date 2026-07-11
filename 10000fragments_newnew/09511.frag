uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    vec2 wq = vec2(vnoise2(p * 3.84 + ph), vnoise2(p * 3.84 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.84 + 2.09 * wq + vec2(1.7, 9.2) + t * 0.68),
                   vnoise2(p * 3.84 + 3.47 * wq + vec2(8.3, 2.8) - t * 0.46));
    v = vnoise2(p * 3.84 + 1.62 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.10;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 18.32 - t * 5.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.78, lr * 1.79 + time * -0.95); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.51 + time * 0.13, vec3(0.42, 0.58, 0.59), vec3(0.39, 0.40, 0.43), vec3(1.24, 0.81, 1.15), vec3(0.30, 0.31, 0.13));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
