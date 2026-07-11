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
    vec2 wq = vec2(vnoise2(p * 3.63 + ph), vnoise2(p * 3.63 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.63 + 2.62 * wq + vec2(1.7, 9.2) + t * 0.78),
                   vnoise2(p * 3.63 + 3.36 * wq + vec2(8.3, 2.8) - t * 0.52));
    v = vnoise2(p * 3.63 + 2.09 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	p = rot2(1.58) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.40, lr * 2.33 + time * -0.63); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.34; p = rot2(0.68) * p; }
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.78));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
