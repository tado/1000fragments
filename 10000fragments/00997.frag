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
    vec2 wq = vec2(vnoise2(p * 2.47 + ph), vnoise2(p * 2.47 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.47 + 2.97 * wq + vec2(1.7, 9.2) + t * 0.92),
                   vnoise2(p * 2.47 + 2.10 * wq + vec2(8.3, 2.8) - t * 0.65));
    v = vnoise2(p * 2.47 + 3.79 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.66;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.35, lr * 2.14 + time * -0.32); }
	p = (floor(p * 18.7) + 0.5) / 18.7;
	p *= 1.0 + 0.16 * sin(time * 1.50);
	p = rot2(p.y * -1.72 + time * 1.06) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.21));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
