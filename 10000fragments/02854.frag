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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 3.79 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.24); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.44), cos(time * 0.73)) * 0.19;
	float an = atan(p.y, p.x) + time * 0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.86 / 3.1415927, 1.05 / r - time * 1.11);
	tv.x += tv.y * 0.36;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.43 + time * 0.34, vec3(0.60, 0.56, 0.43), vec3(0.43, 0.34, 0.36), vec3(1.26, 1.08, 1.34), vec3(0.42, 0.66, 0.72));
	col *= clamp(r * 1.37, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
