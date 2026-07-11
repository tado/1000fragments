uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.59 + t * 1.46 + ph) + sin(p.y * 10.43 - t * 1.46 + ph)
        + sin((p.x + p.y) * 3.90 + t * 1.46 + ph) + sin(length(p) * 6.63 - t * 1.46 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.11, lr * 2.26 + time * -0.41); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.46; p = rot2(2.58) * p; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.48 * p.y + time * 1.41); p.y += 0.45 / wf * cos(wf * 3.00 * p.x + time * 1.32); }
	p = (floor(p * 7.5) + 0.5) / 7.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.20, 0.12, 0.52), vec3(0.53, 0.61, 0.59), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
