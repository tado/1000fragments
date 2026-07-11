uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.78) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 0.80 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 19.39 - t * 4.86 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 12.65 - t * 4.86 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	p += vec2(0.25, 0.87) * sin(length(p) * 2.16 - time * 1.60) * 0.30;
	p = rot2(time * 1.35) * p;
	{ float fr = length(p); p *= 1.0 + -0.25 * fr * fr; }
	p *= 1.47;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.10);
	float d = d1 + d2;
	vec3 col = palette(d * 0.65 + time * 0.19, vec3(0.42, 0.42, 0.52), vec3(0.44, 0.42, 0.42), vec3(0.88, 1.33, 1.34), vec3(0.06, 0.37, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
