uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.03 + vec2(t * 0.51, -t * 0.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.55) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.14; p = rot2(1.93) * p; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.46 * p.y + time * 0.67); p.y += 0.35 / wf * cos(wf * 2.11 * p.x + time * 1.20); }
	p = abs(p) - 0.64;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.48), field(p, time, 0.96));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
