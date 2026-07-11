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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 4.99 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.61); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.59), cos(time * 0.57)) * 0.07;
	float an = atan(p.y, p.x) + time * 0.62;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.21 / 3.1415927, 1.02 / r - time * 2.13);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.30, vec3(0.52, 0.56, 0.46), vec3(0.35, 0.32, 0.40), vec3(0.71, 1.28, 1.24), vec3(0.96, 0.67, 0.23));
	col *= clamp(r * 1.08, 0.0, 1.0);
	col = fract(col * 2.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
