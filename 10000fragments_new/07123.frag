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
    vec2 wq = vec2(vnoise2(p * 4.35 + ph), vnoise2(p * 4.35 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.35 + 2.91 * wq + vec2(1.7, 9.2) + t * 0.43),
                   vnoise2(p * 4.35 + 2.99 * wq + vec2(8.3, 2.8) - t * 0.77));
    v = vnoise2(p * 4.35 + 1.16 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.66;
	p += vec2(0.21, -0.85) * sin(length(p) * 5.36 - time * 1.46) * 0.21;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.66, lr * 2.65 + time * 0.86); }
	p = fract(p * 3.00) - 0.5;
	p = rot2(time * 0.36) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.12, vec3(0.47, 0.52, 0.45), vec3(0.43, 0.48, 0.33), vec3(1.20, 1.31, 0.77), vec3(0.95, 0.40, 0.08));
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 1.27 + time * 13.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
