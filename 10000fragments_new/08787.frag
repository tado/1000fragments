uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.21, t * 1.73 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 12.37 - t * 6.33 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 19.88 - t * 5.20 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.81, lr * 2.07 + time * 0.99); }
	{ q2 = vec2(atan(q2.y, q2.x) * 2.95, length(q2) * 5.74 - time * 0.93); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.83);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.27 + time * 0.74);
	col = mod(col * 1.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
