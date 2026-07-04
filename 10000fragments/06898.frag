uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.51; vec2 jc = vec2(-0.43 + 0.3 * sin(t * 0.41 + ph), 0.76 + 0.3 * cos(t * 0.72 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 20.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.20;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.56; kp = rot2(1.04) * kp; kp *= 1.38; }
    v = sin(kp.y * 2.63 - t * 3.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -2.12 + time * 0.45) * q1;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 0.85));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.64 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
