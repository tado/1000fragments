uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.21) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 2.10 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.76;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.86 * p.y + time * 1.74); p.y += 0.26 / wf * cos(wf * 3.65 * p.x + time * 1.79); }
	p = rot2(length(p) * 3.07 + time * 0.88) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.90, lr * 2.08 + time * -0.46); }
	{ float fr = length(p); p *= 1.0 + 0.56 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.36), field(p, time, 2.72));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
