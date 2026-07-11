uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.26 + sr * 7.98 - t * 3.88 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.25 * cos(sa * 9 + t * 1.20 + ph);
    v = sin((sr - petal) * 9.93);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.99);
	float d = d1 * d2;
	vec3 col = palette(d * 1.07 + time * 0.04, vec3(0.48, 0.41, 0.58), vec3(0.35, 0.48, 0.34), vec3(1.02, 0.88, 1.22), vec3(0.36, 0.13, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
