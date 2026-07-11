uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.18 * cos(sa * 6 + t * 2.29 + ph);
    v = sin((sr - petal) * 6.30);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.26, t * 1.69 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.57 + time * 0.07, vec3(0.50, 0.55, 0.55), vec3(0.48, 0.36, 0.48), vec3(1.39, 0.89, 0.73), vec3(0.23, 0.28, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
