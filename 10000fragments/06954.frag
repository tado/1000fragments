uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.42 + 0.49 * sin(t * 1.47)) + vec2(-0.32, 0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.56 * sin(mf + 3.0) + ph), cos(t * 2.39 * cos(mf + 3.0) + ph));
        ms += 0.083 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.00, lr * 1.08 + time * -0.90); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.33 / wf * sin(wf * 3.84 * q1.y + time * 0.97); q1.y += 0.27 / wf * cos(wf * 3.90 * q1.x + time * 1.94); }
	q2 = rot2(2.23) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.41);
	float d = max(d1, d2);
	vec3 col = vec3(0.82, 0.44, 0.74) * (0.09 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
