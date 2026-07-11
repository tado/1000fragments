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
    vec2 wq = vec2(vnoise2(p * 3.35 + ph), vnoise2(p * 3.35 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.35 + 3.90 * wq + vec2(1.7, 9.2) + t * 0.93),
                   vnoise2(p * 3.35 + 3.18 * wq + vec2(8.3, 2.8) - t * 0.88));
    v = vnoise2(p * 3.35 + 2.10 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	p *= 2.62;
	{ p = vec2(atan(p.y, p.x) * 1.53, length(p) * 2.64 - time * 0.62); }
	{ float fr = length(p); p *= 1.0 + 0.63 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.50), field(p, time, 1.01));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
