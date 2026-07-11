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
    vec2 wq = vec2(vnoise2(p * 3.86 + ph), vnoise2(p * 3.86 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.86 + 3.43 * wq + vec2(1.7, 9.2) + t * 0.75),
                   vnoise2(p * 3.86 + 3.75 * wq + vec2(8.3, 2.8) - t * 0.63));
    v = vnoise2(p * 3.86 + 1.63 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.69));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
