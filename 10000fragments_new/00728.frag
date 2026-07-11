uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.98;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 8.14 - t * 3.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.68 * p.y + time * 1.25); p.y += 0.29 / wf * cos(wf * 3.57 * p.x + time * 1.93); }
	p = rot2(p.y * 3.91 + time * 0.58) * p;
	p += vec2(0.17, -0.74) * sin(length(p) * 2.56 - time * 1.24) * 0.27;
	{ p = vec2(atan(p.y, p.x) * 2.76, length(p) * 3.39 - time * 0.90); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.21, 0.82, 0.93) * (0.05 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
