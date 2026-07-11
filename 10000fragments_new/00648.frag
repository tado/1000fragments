uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.38; vec2 jc = vec2(-0.64 + 0.3 * sin(t * 1.78 + ph), 0.39 + 0.3 * cos(t * 0.78 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 28.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.61) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 2.14 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.47 / wf * sin(wf * 3.16 * q1.y + time * 0.75); q1.y += 0.30 / wf * cos(wf * 3.28 * q1.x + time * 1.95); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.82);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.38, 0.76, 0.91) * (0.20 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
