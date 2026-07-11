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
    vec2 cw = p * 3.88 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.90 + t * 3.26 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.47 + ph), vnoise2(p * 4.47 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.47 + 2.38 * wq + vec2(1.7, 9.2) + t * 0.86),
                   vnoise2(p * 4.47 + 1.36 * wq + vec2(8.3, 2.8) - t * 0.98));
    v = vnoise2(p * 4.47 + 2.59 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 7.01 + time * 3.57) * 0.38;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.16 + time * 0.20, vec3(0.52, 0.51, 0.50), vec3(0.49, 0.34, 0.30), vec3(1.12, 0.94, 1.15), vec3(0.93, 0.02, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
