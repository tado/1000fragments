uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 29.00 - t * 7.97 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 11.20 - t * 7.97 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.54 + sr * 15.85 - t * 4.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.36, length(p) * 5.82 - time * 0.38); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.68, lr * 1.82 + time * 0.78); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.54 + time * 0.02, vec3(0.44, 0.48, 0.43), vec3(0.47, 0.33, 0.44), vec3(1.08, 0.91, 1.18), vec3(0.62, 0.33, 0.17));
	col = fract(col * 1.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
