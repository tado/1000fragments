uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 11.66 - t * 4.29 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 31.63 - t * 1.46 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.39 + t * 3.41 + ph) + sin(p.y * 10.14 - t * 3.41 + ph)
        + sin((p.x + p.y) * 4.00 + t * 3.41 + ph) + sin(length(p) * 12.16 - t * 3.41 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.36, lr * 2.61 + time * -0.62); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.23);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.58 + time * 0.00);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
