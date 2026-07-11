uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 17.17 - t * 6.26 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 20.36 - t * 6.26 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.32; p = rot2(2.30) * p; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.56 * p.y + time * 1.10); p.y += 0.37 / wf * cos(wf * 2.94 * p.x + time * 0.99); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.50));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
