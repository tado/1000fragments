uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.63; vec2 jc = vec2(-0.41 + 0.3 * sin(t * 1.77 + ph), -0.40 + 0.3 * cos(t * 0.56 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 20.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.55) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 1.12 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.43 / wf * sin(wf * 4.00 * q1.y + time * 0.66); q1.y += 0.46 / wf * cos(wf * 1.82 * q1.x + time * 1.12); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.38 / wf * sin(wf * 3.13 * q2.y + time * 0.83); q2.y += 0.27 / wf * cos(wf * 2.44 * q2.x + time * 1.05); }
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.04);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.78 + time * 0.37, vec3(0.56, 0.55, 0.53), vec3(0.44, 0.37, 0.44), vec3(1.33, 0.87, 1.07), vec3(0.84, 0.00, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
