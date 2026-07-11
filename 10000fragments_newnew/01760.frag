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
    vec2 wq = vec2(vnoise2(p * 1.87 + ph), vnoise2(p * 1.87 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.87 + 2.14 * wq + vec2(1.7, 9.2) + t * 1.16),
                   vnoise2(p * 1.87 + 3.01 * wq + vec2(8.3, 2.8) - t * 1.06));
    v = vnoise2(p * 1.87 + 3.62 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.96) * p * 17.03;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = mix(vec3(0.79, 0.77, 0.62), vec3(0.04, 0.08, 0.17), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
