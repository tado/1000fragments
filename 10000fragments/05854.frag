uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.79;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 22.67 - t * 4.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	p = rot2(time * 1.34) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.72 * p.y + time * 1.36); p.y += 0.22 / wf * cos(wf * 2.33 * p.x + time * 0.86); }
	p = rot2(p.y * -3.13 + time * 1.00) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.45), field(p, time, 0.91));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
