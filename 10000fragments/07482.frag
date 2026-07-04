uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.11 * cos(sa * 7.0 + t * 2.24 + ph);
    v = sin((sr - petal) * 9.55);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.87; vec2 jc = vec2(0.02 + 0.3 * sin(t * 1.22 + ph), 0.38 + 0.3 * cos(t * 0.52 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 37.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.56) * q1;
	q1.x += sin(q1.y * 3.13 + time * 3.83) * 0.12;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.78; }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.33, lr * 2.13 + time * -0.84); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.77);
	float d = min(d1, d2);
	vec3 col = vec3(0.82, 0.49, 0.55) * (0.07 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
