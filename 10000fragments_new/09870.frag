uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.55 + sr * 10.54 - t * 4.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.31;
	p.y += sin(p.x * 6.56 + time * 2.88) * 0.33;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.28 * p.y + time * 0.69); p.y += 0.37 / wf * cos(wf * 1.65 * p.x + time * 1.21); }
	p = abs(p);
	p = rot2(1.86) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.30));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
