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
    vec2 cw = p * 2.81 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.17 + t * 3.67 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.86 + ph), vnoise2(p * 1.86 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.86 + 2.98 * wq + vec2(1.7, 9.2) + t * 0.55),
                   vnoise2(p * 1.86 + 2.90 * wq + vec2(8.3, 2.8) - t * 1.09));
    v = vnoise2(p * 1.86 + 1.73 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.84;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.28);
	float d = d1 * d2;
	vec3 col = palette(d * 1.50 + time * 0.24, vec3(0.56, 0.54, 0.50), vec3(0.35, 0.37, 0.48), vec3(1.13, 1.04, 1.13), vec3(0.71, 0.65, 0.58));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
