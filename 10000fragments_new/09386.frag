uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.89 + sin(p.y * 4.38 + t * 5.89) * 4.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.92;
	p = rot2(length(p) * -3.40 + time * 1.46) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.95 * p.y + time * 0.69); p.y += 0.26 / wf * cos(wf * 1.75 * p.x + time * 1.27); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.82, lr * 1.70 + time * 0.95); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.38, 0.30, 0.36), vec3(0.70, 0.83, 0.97), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
