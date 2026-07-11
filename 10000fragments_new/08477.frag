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
    vec2 wq = vec2(vnoise2(p * 3.18 + ph), vnoise2(p * 3.18 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.18 + 3.08 * wq + vec2(1.7, 9.2) + t * 0.55),
                   vnoise2(p * 3.18 + 2.59 * wq + vec2(8.3, 2.8) - t * 1.00));
    v = vnoise2(p * 3.18 + 1.95 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.82 / 3.1415927, 0.42 / r - time * 2.72);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.29, vec3(0.59, 0.44, 0.43), vec3(0.50, 0.41, 0.40), vec3(0.78, 0.79, 1.19), vec3(0.55, 0.19, 0.03));
	col *= clamp(r * 2.11, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.66 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
