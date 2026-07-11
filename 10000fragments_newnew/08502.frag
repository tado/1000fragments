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
    vec2 wq = vec2(vnoise2(p * 4.70 + ph), vnoise2(p * 4.70 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.70 + 2.83 * wq + vec2(1.7, 9.2) + t * 1.09),
                   vnoise2(p * 4.70 + 1.64 * wq + vec2(8.3, 2.8) - t * 0.57));
    v = vnoise2(p * 4.70 + 1.56 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.15;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.84 / 3.1415927, 1.31 / r - time * 0.98);
	tv.x += tv.y * 0.41;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.02, vec3(0.40, 0.57, 0.42), vec3(0.43, 0.40, 0.41), vec3(1.35, 0.89, 1.17), vec3(0.55, 0.33, 0.46));
	col *= clamp(r * 2.28, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
