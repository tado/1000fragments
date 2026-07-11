uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.35 + t * 4.02 + ph) + sin(p.y * 3.96 - t * 0.77 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	p = rot2(time * -1.22) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.52 * p.y + time * 0.73); p.y += 0.44 / wf * cos(wf * 1.79 * p.x + time * 1.27); }
	p = fract(p * 1.95) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.51));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
