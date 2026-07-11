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
    vec2 hx = p * 6.89;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 16.58 - t * 3.92 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.67 + ph), vnoise2(p * 2.67 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.67 + 2.58 * wq + vec2(1.7, 9.2) + t * 0.36),
                   vnoise2(p * 2.67 + 2.85 * wq + vec2(8.3, 2.8) - t * 0.59));
    v = vnoise2(p * 2.67 + 1.71 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.40;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.18, lr * 1.06 + time * -0.49); }
	p.x += sin(p.y * 4.19 + time * 3.27) * 0.16;
	{ p = vec2(atan(p.y, p.x) * 2.27, length(p) * 4.07 - time * 0.69); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.32);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.16 + time * 0.07, vec3(0.42, 0.54, 0.51), vec3(0.45, 0.32, 0.39), vec3(1.30, 1.37, 1.33), vec3(0.61, 0.01, 0.69));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
