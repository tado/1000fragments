uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.56 + sr * 14.34 - t * 2.58 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.14; vec2 jc = vec2(0.12 + 0.3 * sin(t * 1.31 + ph), 0.57 + 0.3 * cos(t * 1.68 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.04;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.64) * q1;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.10, length(q1) * 3.81 - time * 0.61); }
	q2 *= 2.37;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.81);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.73));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.16 + time * 0.39);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
