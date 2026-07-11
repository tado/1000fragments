uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.88, t * 1.03 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.32 + 0.14 * cos(sa * 4 + t * 0.48 + ph);
    v = sin((sr - petal) * 13.66);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.91);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.01 + time * 0.23, vec3(0.50, 0.43, 0.45), vec3(0.31, 0.34, 0.37), vec3(0.95, 1.15, 1.36), vec3(0.65, 0.82, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
