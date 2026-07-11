uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.34 * sin(mf + 3.0) + ph), cos(t * 0.87 * cos(mf + 3.0) + ph));
        ms += 0.049 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.78 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.33; p = rot2(1.34) * p; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.10 * p.y + time * 1.52); p.y += 0.24 / wf * cos(wf * 3.67 * p.x + time * 1.61); }
	p = (floor(p * 12.5) + 0.5) / 12.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.43));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
