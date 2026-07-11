uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 4.08 * sin(t * 1.12) + t * 5.42 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.07;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 16.21 - t * 1.15 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.14; vec2 jc = vec2(0.15 + 0.3 * sin(t * 1.33 + ph), 0.02 + 0.3 * cos(t * 1.35 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.x += sin(q1.y * 7.47 + time * 2.47) * 0.37;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.20, lr * 1.46 + time * -0.37); }
	q2.x += sin(q2.y * 3.88 + time * 3.33) * 0.27;
	q2 = abs(q2) - 0.63;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.03);
	float d3 = fieldC(q3, time, 0.89);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.22, 0.70, 0.28) * (0.17 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.82 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
