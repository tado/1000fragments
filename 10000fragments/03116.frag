uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 19.77 - t * 2.83 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 10.71 - t * 2.83 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.16 * p.y + time * 1.61); p.y += 0.50 / wf * cos(wf * 2.41 * p.x + time * 1.75); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.46; p = rot2(0.77) * p; }
	p += vec2(-0.80, -0.99) * sin(length(p) * 3.11 - time * 1.19) * 0.31;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.89), field(p, time, 1.77));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
