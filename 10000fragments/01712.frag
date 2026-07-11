uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.95 - t * 7.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	p = rot2(p.y * 3.96 + time * 0.93) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.48; p = rot2(1.29) * p; }
	p += vec2(0.94, -0.81) * sin(length(p) * 4.91 - time * 1.55) * 0.30;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 2.52 * p.y + time * 1.43); p.y += 0.35 / wf * cos(wf * 3.39 * p.x + time * 1.97); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.60), field(p, time, 1.20));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
