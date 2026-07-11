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
    vec2 wq = vec2(vnoise2(p * 2.70 + ph), vnoise2(p * 2.70 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.70 + 3.88 * wq + vec2(1.7, 9.2) + t * 1.03),
                   vnoise2(p * 2.70 + 1.25 * wq + vec2(8.3, 2.8) - t * 0.88));
    v = vnoise2(p * 2.70 + 2.79 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 7.72 + time * 1.94) * 0.16;
	{ float fr = length(p); p *= 1.0 + 0.30 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.94, lr * 1.82 + time * -0.65); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.06, 0.05), vec3(0.52, 0.61, 0.95), d);
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
