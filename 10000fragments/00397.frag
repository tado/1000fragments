uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.28 + t * 4.62 + ph) + sin(p.y * 15.00 - t * 5.30 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.34 * p.y + time * 1.84); p.y += 0.23 / wf * cos(wf * 3.13 * p.x + time * 1.39); }
	p = rot2(p.y * -2.32 + time * 0.76) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.56));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
