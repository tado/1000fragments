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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.51 + ph), vnoise2(p * 4.51 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.51 + 3.42 * wq + vec2(1.7, 9.2) + t * 0.66),
                   vnoise2(p * 4.51 + 3.92 * wq + vec2(8.3, 2.8) - t * 1.12));
    v = vnoise2(p * 4.51 + 2.89 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	{ float fr = length(p); p *= 1.0 + -0.41 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.96, lr * 2.70 + time * -0.89); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.23));
	col = 0.5 + 0.5 * col;
	col *= 0.87 + 0.10 * sin(gl_FragCoord.y * 2.65 + time * 14.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
