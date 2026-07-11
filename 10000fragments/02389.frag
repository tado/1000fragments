uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.22 * cos(sa * 8 + t * 0.81 + ph);
    v = sin((sr - petal) * 16.31);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.17 * cos(sa * 4 + t * 1.05 + ph);
    v = sin((sr - petal) * 8.72);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.16 + time * 0.00, vec3(0.45, 0.56, 0.58), vec3(0.45, 0.35, 0.49), vec3(0.93, 0.81, 0.98), vec3(0.69, 0.57, 0.13));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
