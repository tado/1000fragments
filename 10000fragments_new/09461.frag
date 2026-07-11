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
    vec2 wq = vec2(vnoise2(p * 4.57 + ph), vnoise2(p * 4.57 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.57 + 1.05 * wq + vec2(1.7, 9.2) + t * 0.52),
                   vnoise2(p * 4.57 + 1.44 * wq + vec2(8.3, 2.8) - t * 0.95));
    v = vnoise2(p * 4.57 + 2.36 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.19 / 3.1415927, 0.52 / r - time * 0.66);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.02, 0.12), vec3(0.62, 0.80, 0.58), cc);
	col *= clamp(r * 1.71, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
