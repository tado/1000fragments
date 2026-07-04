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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.31 * vnoise2(p * 5.47 + t * 0.99);
    v = sin(wr * 14.91 - t * 1.18 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.35 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.83 + t * 3.46 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	{ p = vec2(atan(p.y, p.x) * 2.26, length(p) * 5.85 - time * 0.66); }
	p = rot2(time * 1.19) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.32);
	float d = d1 * d2;
	vec3 col = palette(d * 1.05 + time * 0.16, vec3(0.50, 0.47, 0.43), vec3(0.46, 0.42, 0.49), vec3(0.71, 0.84, 1.10), vec3(0.51, 0.66, 0.21));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
