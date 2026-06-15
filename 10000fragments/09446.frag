uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 36.06 - t * 6.64 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 21.70 - t * 6.64 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.02 + vec2(t * 0.96, -t * 0.96) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 2.72 + time * 0.14); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.57;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 1.81 * p.y + time * 0.63); p.y += 0.49 / wf * cos(wf * 1.90 * p.x + time * 1.60); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.70 + time * 0.23, vec3(0.60, 0.41, 0.45), vec3(0.32, 0.48, 0.30), vec3(0.97, 0.88, 1.00), vec3(0.54, 0.20, 0.38));
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
