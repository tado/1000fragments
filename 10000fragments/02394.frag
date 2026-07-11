uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.17 * cos(sa * 3 + t * 1.29 + ph);
    v = sin((sr - petal) * 7.04);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.28 * cos(sa * 7 + t * 2.48 + ph);
    v = sin((sr - petal) * 9.03);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.26, length(p) * 2.96 - time * 0.34); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.13);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.02 + time * 0.23, vec3(0.60, 0.51, 0.46), vec3(0.43, 0.39, 0.39), vec3(1.28, 0.97, 0.84), vec3(0.15, 0.73, 0.14));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
