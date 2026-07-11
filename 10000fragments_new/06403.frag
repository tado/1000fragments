uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 13.96 - t * 5.87 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 31.46 - t * 3.55 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.43 + vec2(t * 2.61, -t * 2.30) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.31) * q1;
	q2.x += sin(q2.y * 2.76 + time * 1.21) * 0.29;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.40, lr * 1.09 + time * 0.45); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.95);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.99 + time * 0.13);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
