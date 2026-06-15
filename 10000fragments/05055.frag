uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.18 - t * 7.62 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.17 * cos(sa * 8 + t * 1.87 + ph);
    v = sin((sr - petal) * 17.77);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.13;
	{ p = vec2(atan(p.y, p.x) * 1.68, length(p) * 2.63 - time * 0.11); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.82);
	float d = d1 * d2;
	vec3 col = palette(d * 1.69 + time * 0.06, vec3(0.55, 0.47, 0.54), vec3(0.45, 0.35, 0.34), vec3(0.71, 1.31, 1.30), vec3(0.43, 0.32, 0.47));
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
