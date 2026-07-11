uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 15.08 - t * 7.20 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 39.16 - t * 7.39 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.41;
	p = rot2(time * -1.06) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(1.42) * p; }
	p *= 1.94;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 1.69 * p.y + time * 1.24); p.y += 0.46 / wf * cos(wf * 3.50 * p.x + time * 1.40); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.33, 0.93, 0.82) * (0.23 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
