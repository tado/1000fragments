uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.19 + t * 2.59 + ph) + sin(p.y * 9.59 - t * 2.59 + ph)
        + sin((p.x + p.y) * 7.14 + t * 2.59 + ph) + sin(length(p) * 14.71 - t * 2.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.51 * fr * fr; }
	p = rot2(length(p) * 1.89 + time * 0.25) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.48 * p.y + time * 2.00); p.y += 0.33 / wf * cos(wf * 3.76 * p.x + time * 0.70); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.43));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
