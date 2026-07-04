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
    float wr = length(p) + 0.22 * vnoise2(p * 3.99 + t * 0.75);
    v = sin(wr * 23.67 - t * 2.16 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.47), field(p, time, 0.94));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.48 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
