uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.20 * cos(sa * 8 + t * 1.39 + ph);
    v = sin((sr - petal) * 9.99);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.53 + sr * 5.85 - t * 1.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	p += vec2(0.61, 0.24) * sin(length(p) * 5.53 - time * 1.06) * 0.29;
	p *= 2.19;
	p = abs(p) - 0.35;
	{ p = vec2(atan(p.y, p.x) * 2.73, length(p) * 2.65 - time * 0.55); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.34);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.09 + time * 0.24, vec3(0.41, 0.42, 0.59), vec3(0.38, 0.41, 0.36), vec3(1.03, 1.08, 1.31), vec3(0.19, 0.34, 0.40));
	col = fract(col * 2.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
