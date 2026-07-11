uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 18.40 - t * 3.41 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 16.10 - t * 1.51 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -3.25 + time * 0.92) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.50 * p.y + time * 1.07); p.y += 0.26 / wf * cos(wf * 3.23 * p.x + time * 1.88); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.12, lr * 1.65 + time * 0.85); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(1.67) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.69 + time * 0.22);
	col = clamp((col - 0.5) * 1.75 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
