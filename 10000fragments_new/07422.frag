uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.82);
    float gsh = hash21(vec2(grow, floor(t * 2.93))) - 0.5;
    float gx = p.x + gsh * 0.77;
    v = sin(gx * 17.42 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.15));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.13;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.68 * p.y + time * 0.73); p.y += 0.32 / wf * cos(wf * 1.68 * p.x + time * 1.08); }
	p = rot2(p.y * -2.79 + time * 0.45) * p;
	{ p = vec2(atan(p.y, p.x) * 1.72, length(p) * 4.64 - time * 0.24); }
	p *= 1.67;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.92));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.88 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
