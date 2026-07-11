uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.84 + sin(p.y * 2.79 + t * 4.03) * 1.69 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.22; vec2 jc = vec2(-0.16 + 0.3 * sin(t * 0.33 + ph), -0.50 + 0.3 * cos(t * 1.35 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 21.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.80; vec2 jc = vec2(-0.78 + 0.3 * sin(t * 0.56 + ph), -0.77 + 0.3 * cos(t * 0.86 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.94, length(q1) * 4.61 - time * 0.76); }
	q1 *= 1.54;
	q2 += vec2(-0.80, 0.17) * sin(length(q2) * 5.44 - time * 1.38) * 0.18;
	q3 = (floor(q3 * 15.1) + 0.5) / 15.1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.96);
	float d3 = fieldC(q3, time, 1.45);
	d2 = d2 * d3;
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.05, 0.23), vec3(0.70, 0.67, 0.41), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
