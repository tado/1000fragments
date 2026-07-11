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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.77 + ph), vnoise2(p * 1.77 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.77 + 1.53 * wq + vec2(1.7, 9.2) + t * 1.08),
                   vnoise2(p * 1.77 + 3.07 * wq + vec2(8.3, 2.8) - t * 1.13));
    v = vnoise2(p * 1.77 + 1.91 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.90), cos(time * 0.98)) * 0.27;
	float an = atan(p.y, p.x) + time * -0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.82 / 3.1415927, 1.05 / r - time * 2.20);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.36, vec3(0.45, 0.58, 0.53), vec3(0.45, 0.35, 0.44), vec3(1.25, 1.23, 1.29), vec3(0.92, 0.77, 0.98));
	col *= clamp(r * 1.50, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
