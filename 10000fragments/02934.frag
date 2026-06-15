uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 9.45 - t * 7.72 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 24.18 - t * 7.72 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 10.32 - t * 2.96 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 11.14 - t * 2.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	{ p = vec2(atan(p.y, p.x) * 2.17, length(p) * 3.82 - time * 0.23); }
	{ float fr = length(p); p *= 1.0 + 0.21 * fr * fr; }
	p = fract(p * 1.49) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.08);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.92 + time * 0.28, vec3(0.43, 0.48, 0.47), vec3(0.38, 0.33, 0.47), vec3(0.73, 0.95, 1.38), vec3(0.46, 0.45, 0.69));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
