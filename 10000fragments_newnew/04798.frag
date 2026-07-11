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
    vec2 wq = vec2(vnoise2(p * 4.73 + ph), vnoise2(p * 4.73 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.73 + 2.78 * wq + vec2(1.7, 9.2) + t * 0.85),
                   vnoise2(p * 4.73 + 1.40 * wq + vec2(8.3, 2.8) - t * 0.61));
    v = vnoise2(p * 4.73 + 2.63 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.11) * p * 19.51;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = mix(vec3(0.99, 0.88, 0.69), vec3(0.14, 0.10, 0.11), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
