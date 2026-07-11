uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.19 * cos(sa * 8 + t * 1.58 + ph);
    v = sin((sr - petal) * 14.36);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.92, t * 1.63 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.21);
	float d = d1 + d2;
	vec3 col = palette(d * 1.63 + time * 0.03, vec3(0.44, 0.54, 0.40), vec3(0.39, 0.36, 0.50), vec3(1.35, 1.34, 0.98), vec3(0.12, 0.31, 0.88));
	col = fract(col * 2.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
