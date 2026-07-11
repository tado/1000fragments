uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.59;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 11.28 - t * 2.22 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.95;
	p *= 1.0 + 0.11 * sin((time * 0.56) * 2.18);
	{ p = vec2(atan(p.y, p.x) * 2.18, length(p) * 5.00 - (time * 0.56) * 0.63); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.18 * p.y + (time * 0.56) * 1.51); p.y += 0.50 / wf * cos(wf * 3.50 * p.x + (time * 0.56) * 2.12); }
	float d = field(p, (time * 0.56), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.60, 0.53, 0.50) + vec3(0.10, 0.08, 0.05);
	col *= 0.83 + 0.11 * sin(gl_FragCoord.y * 2.25 + (time * 0.56) * 8.98);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.025, 0.993, 0.918) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
