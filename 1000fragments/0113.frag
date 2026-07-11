uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.00 - t * 1.07 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.71 * p.y + time * 1.94); p.y += 0.42 / wf * cos(wf * 1.78 * p.x + time * 1.63); }
	p = rot2(length(p) * -1.06 + time * 1.12) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.64));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
