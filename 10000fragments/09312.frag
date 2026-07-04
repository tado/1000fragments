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
    float wr = length(p) + 0.39 * vnoise2(p * 5.07 + t * 0.40);
    v = sin(wr * 12.05 - t * 0.59 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.50), cos(time * 1.05)) * 0.17;
	float an = atan(p.y, p.x) + time * 0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.28 / 3.1415927, 0.84 / r - time * 0.57);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.00, 0.07), vec3(0.56, 0.64, 0.58), cc);
	col *= clamp(r * 1.68, 0.0, 1.0);
	col = fract(col * 2.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
