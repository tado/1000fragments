uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 7.58 * sin(t * 1.06) + t * 5.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.63 * p.y + time * 2.04); p.y += 0.47 / wf * cos(wf * 2.90 * p.x + time * 1.87); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.19, lr * 1.78 + time * -0.43); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.26; p = rot2(0.81) * p; }
	p = rot2(length(p) * -3.55 + time * 0.73) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.83, 0.88, 0.30) * (0.07 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
