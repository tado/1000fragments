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
    float wr = length(p) + 0.26 * vnoise2(p * 3.80 + t * 0.87);
    v = sin(wr * 20.53 - t * 2.28 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	p = rot2(length(p) * -2.01 + time * 0.42) * p;
	p += vec2(-0.22, 0.12) * sin(length(p) * 3.51 - time * 0.93) * 0.36;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.88; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.25, 0.26), vec3(0.91, 0.68, 0.93), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.71 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
