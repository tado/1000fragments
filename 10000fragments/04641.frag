uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 16.04 - t * 5.13 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 29.89 - t * 5.13 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.03 + time * 0.65) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.89, lr * 2.24 + time * -0.63); }
	p = abs(p) - 0.68;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.96 * p.y + time * 0.65); p.y += 0.33 / wf * cos(wf * 3.03 * p.x + time * 1.56); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.61 + time * 0.24);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
