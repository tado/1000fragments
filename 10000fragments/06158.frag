uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.53 + 0.32 * pow(abs(cos(ra * 3.0 + t * 1.86)), 0.70);
    v = sin((rr - pet) * 11.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.70;
	p = rot2(1.42) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.73 * p.y + time * 1.34); p.y += 0.43 / wf * cos(wf * 4.00 * p.x + time * 1.89); }
	p = abs(p);
	p = rot2(length(p) * -3.31 + time * 1.16) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.61));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
