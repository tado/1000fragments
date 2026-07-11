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
    v = sin(sa * 3.95 + sr * 4.19 - t * 2.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.26;
	p = abs(p);
	p = rot2(time * -1.18) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.09 * p.y + time * 1.78); p.y += 0.22 / wf * cos(wf * 2.36 * p.x + time * 1.43); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.18, vec3(0.52, 0.51, 0.49), vec3(0.48, 0.31, 0.38), vec3(1.18, 1.24, 1.29), vec3(0.10, 0.47, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
