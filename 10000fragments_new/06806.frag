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
    vec2 wq = vec2(vnoise2(p * 2.72 + ph), vnoise2(p * 2.72 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.72 + 1.94 * wq + vec2(1.7, 9.2) + t * 0.80),
                   vnoise2(p * 2.72 + 1.95 * wq + vec2(8.3, 2.8) - t * 1.08));
    v = vnoise2(p * 2.72 + 1.33 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 7.91 + time * 1.24) * 0.32;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.42, lr * 2.08 + time * -0.84); }
	p *= 2.83;
	p = (floor(p * 17.9) + 0.5) / 17.9;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.13, 0.13, 0.36), vec3(0.86, 0.92, 0.57), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
