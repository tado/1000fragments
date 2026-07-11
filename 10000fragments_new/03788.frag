uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.66 + 0.16 * cos(sa * 4.0 + t * 1.13 + ph);
    v = sin((sr - petal) * 7.02);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.70 - t * 5.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	p = abs(p);
	p = (floor(p * 9.8) + 0.5) / 9.8;
	p = rot2(length(p) * -1.36 + time * 0.62) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.49 * p.y + time * 1.10); p.y += 0.32 / wf * cos(wf * 3.16 * p.x + time * 1.25); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.22);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.63 + time * 0.30, vec3(0.45, 0.55, 0.43), vec3(0.38, 0.37, 0.44), vec3(1.07, 0.95, 0.72), vec3(0.01, 0.59, 0.71));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
