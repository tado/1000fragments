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
    float wr = length(p) + 0.30 * vnoise2(p * 2.23 + t * 0.85);
    v = sin(wr * 24.23 - t * 3.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.68) * p * 18.22;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.03, 0.04, 0.03), vec3(0.98, 0.96, 0.84), v);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
