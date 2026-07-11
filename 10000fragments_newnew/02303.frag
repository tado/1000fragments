uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.13 * cos(sa * 9.0 + t * 1.91 + ph);
    v = sin((sr - petal) * 19.02);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.91; vec2 jc = vec2(-0.44 + 0.3 * sin(t * 0.79 + ph), 0.30 + 0.3 * cos(t * 1.65 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.37 * sin(mf + 3.0) + ph), cos(t * 1.71 * cos(mf + 3.0) + ph));
        ms += 0.034 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.59, 0.55) * sin(length(q1) * 5.54 - time * 1.16) * 0.20;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.62; }
	q3 = (floor(q3 * 21.2) + 0.5) / 21.2;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q3.x += 0.30 / wf * sin(wf * 2.49 * q3.y + time * 0.65); q3.y += 0.37 / wf * cos(wf * 1.76 * q3.x + time * 2.17); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.46);
	float d3 = fieldC(q3, time, 0.91);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.12));
	vec3 col = hue(d * 1.41 + time * 0.35);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.28 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
