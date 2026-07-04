uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.71 + sin(p.y * 1.45 + t * 1.82) * 2.43 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.77) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 2.83 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 12.3) + 0.5) / 12.3;
	q1 = rot2(time * 0.81) * q1;
	q2 *= 1.0 + 0.17 * sin(time * 1.73);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.27 / wf * sin(wf * 2.11 * q2.y + time * 1.03); q2.y += 0.37 / wf * cos(wf * 1.92 * q2.x + time * 1.53); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.60);
	float d = d1 * d2;
	vec3 col = vec3(0.51, 0.83, 0.29) * (0.16 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
