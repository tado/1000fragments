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
    vec2 wq = vec2(vnoise2(p * 2.39 + ph), vnoise2(p * 2.39 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.39 + 1.64 * wq + vec2(1.7, 9.2) + t * 1.09),
                   vnoise2(p * 2.39 + 3.68 * wq + vec2(8.3, 2.8) - t * 0.33));
    v = vnoise2(p * 2.39 + 2.47 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.58, lr * 2.04 + time * 0.80); }
	p = fract(p * 1.33) - 0.5;
	p = rot2(1.52) * p;
	p.x += sin(p.y * 6.42 + time * 1.42) * 0.24;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.86));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
