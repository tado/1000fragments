uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.04 + sr * 8.60 - t * 1.80 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.62, t * 0.47 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	p += vec2(-0.01, 0.33) * sin(length(p) * 3.68 - time * 0.68) * 0.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.58);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.69 + time * 0.08, vec3(0.59, 0.54, 0.46), vec3(0.32, 0.36, 0.33), vec3(1.11, 1.16, 0.70), vec3(0.69, 0.34, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
