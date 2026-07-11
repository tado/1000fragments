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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.67 + ph), vnoise2(p * 1.67 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.67 + 2.16 * wq + vec2(1.7, 9.2) + t * 0.91),
                   vnoise2(p * 1.67 + 3.44 * wq + vec2(8.3, 2.8) - t * 1.10));
    v = vnoise2(p * 1.67 + 3.48 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	p = rot2(length(p) * 3.13 + time * 0.97) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.94, lr * 2.21 + time * 0.43); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.51), field(p, time, 1.02));
	col = 0.5 + 0.5 * col;
	col *= 0.87 + 0.12 * sin(gl_FragCoord.y * 1.79 + time * 9.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
