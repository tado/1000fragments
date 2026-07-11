uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.12 + t * 4.25 + ph) + sin(p.y * 13.24 - t * 4.25 + ph)
        + sin((p.x + p.y) * 8.98 + t * 4.25 + ph) + sin(length(p) * 15.12 - t * 4.25 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.33 + t * 2.33 + ph) + sin(p.y * 15.79 - t * 5.41 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.66; vec2 jc = vec2(-0.20 + 0.3 * sin(t * 1.19 + ph), 0.39 + 0.3 * cos(t * 1.01 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = rot2(time * 0.37) * q3;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q3.x += 0.40 / wf * sin(wf * 3.06 * q3.y + time * 1.65); q3.y += 0.50 / wf * cos(wf * 2.87 * q3.x + time * 1.98); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.31);
	float d3 = fieldC(q3, time, 1.93);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.75 + time * 0.60);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.96 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
