uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.66 + t * 3.14 + ph) + sin(p.y * 2.73 - t * 4.24 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 24.76 - t * 7.63 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 21.61 - t * 7.63 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -3.48 + time * 0.48) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.32, lr * 1.96 + time * -0.41); }
	p = rot2(time * -0.48) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 2.32 * p.y + time * 1.79); p.y += 0.24 / wf * cos(wf * 1.57 * p.x + time * 0.87); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.33);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.55 + time * 0.17, vec3(0.57, 0.57, 0.53), vec3(0.49, 0.49, 0.31), vec3(1.21, 1.28, 1.24), vec3(0.58, 0.40, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
