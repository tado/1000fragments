uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.32 + sr * 21.43 - t * 0.62 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.35 + vec2(t * 0.65, -t * 0.65) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.68;
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.58);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.55 + time * 0.02, vec3(0.55, 0.46, 0.44), vec3(0.48, 0.48, 0.45), vec3(1.21, 0.84, 1.05), vec3(0.19, 0.70, 0.62));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
