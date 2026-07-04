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
    float wr = length(p) + 0.39 * vnoise2(p * 3.85 + t * 1.37);
    v = sin(wr * 22.49 - t * 1.79 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.19 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.60 + t * 1.16 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.40, 0.65) * sin(length(p) * 3.80 - time * 1.70) * 0.34;
	p = (floor(p * 14.9) + 0.5) / 14.9;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.41; p = rot2(0.36) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.73 + time * 0.28, vec3(0.55, 0.51, 0.49), vec3(0.39, 0.34, 0.41), vec3(1.28, 1.33, 0.93), vec3(0.26, 0.52, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
