uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.52 + sr * 10.34 - t * 4.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.57 * p.y + time * 1.22); p.y += 0.29 / wf * cos(wf * 1.95 * p.x + time * 1.99); }
	p = rot2(time * -0.99) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.71));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
