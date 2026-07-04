uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.87, t * 2.37 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.83 + sin(p.y * 3.26 + t * 3.79) * 3.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.37 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.09);
	float d = d1 * d2;
	vec3 col = palette(d * 0.45 + time * 0.40, vec3(0.51, 0.54, 0.45), vec3(0.37, 0.46, 0.36), vec3(1.38, 1.28, 0.71), vec3(0.06, 0.16, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
