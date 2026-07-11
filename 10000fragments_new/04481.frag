uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.59 + 0.24 * pow(abs(cos(ra * 3.0 + t * 1.88)), 2.19);
    v = sin((rr - pet) * 12.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.36; p = rot2(0.86) * p; }
	p = rot2(time * -0.48) * p;
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.65 * p.y + time * 1.25); p.y += 0.39 / wf * cos(wf * 3.06 * p.x + time * 1.25); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.20, 0.38, 0.21) * (0.17 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
