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
    float petal = 0.69 + 0.12 * cos(sa * 8.0 + t * 2.91 + ph);
    v = sin((sr - petal) * 11.60);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.49 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.10 + t * 3.78 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.87 * p.y + time * 1.59); p.y += 0.33 / wf * cos(wf * 1.80 * p.x + time * 1.39); }
	p = rot2(length(p) * -1.33 + time * 1.31) * p;
	p = rot2(p.y * 2.69 + time * 0.75) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.51);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.73 + time * 0.28, vec3(0.57, 0.53, 0.41), vec3(0.45, 0.37, 0.38), vec3(1.31, 0.93, 1.25), vec3(0.30, 0.21, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
