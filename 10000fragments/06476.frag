uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.09 + t * 1.17 + ph) + sin(p.y * 9.71 - t * 1.17 + ph)
        + sin((p.x + p.y) * 3.28 + t * 1.17 + ph) + sin(length(p) * 11.94 - t * 1.17 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.32; p = rot2(2.22) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.84 * p.y + time * 0.65); p.y += 0.25 / wf * cos(wf * 3.10 * p.x + time * 1.31); }
	p = fract(p * 1.25) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.41));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
