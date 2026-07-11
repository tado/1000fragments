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
    vec2 wq = vec2(vnoise2(p * 4.33 + ph), vnoise2(p * 4.33 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.33 + 2.84 * wq + vec2(1.7, 9.2) + t * 0.31),
                   vnoise2(p * 4.33 + 1.37 * wq + vec2(8.3, 2.8) - t * 0.55));
    v = vnoise2(p * 4.33 + 3.41 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.65, lr * 2.30 + time * 0.78); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.08, 0.10, 0.30), vec3(0.59, 0.66, 0.87), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
