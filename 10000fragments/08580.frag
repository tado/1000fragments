uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.53 + t * 1.06 + ph) + sin(p.y * 12.15 - t * 3.69 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	p = rot2(2.55) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.55 * p.y + time * 1.21); p.y += 0.39 / wf * cos(wf * 1.87 * p.x + time * 1.79); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.31), field(p, time, 0.61));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
