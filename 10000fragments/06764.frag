uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.25 + t * 1.11 + ph) + sin(p.y * 13.57 - t * 2.94 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.49 + 0.13 * cos(sa * 6 + t * 0.43 + ph);
    v = sin((sr - petal) * 8.50);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	{ p = vec2(atan(p.y, p.x) * 2.71, length(p) * 2.98 - time * 0.19); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.69 + time * 0.03, vec3(0.50, 0.55, 0.45), vec3(0.38, 0.46, 0.43), vec3(0.88, 0.83, 0.76), vec3(0.61, 0.31, 0.37));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
