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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 3.06 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.03); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.88), cos(time * 0.58)) * 0.21;
	float an = atan(p.y, p.x) + time * -0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.46 / 3.1415927, 1.12 / r + time * 2.36);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.92, 0.89, 0.66) * (0.16 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 1.60, 0.0, 1.0);
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 2.08 + time * 13.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
