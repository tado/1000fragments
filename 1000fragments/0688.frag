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
    v = sin(sa * 4.54 + sr * 5.04 - t * 2.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	p = rot2(2.83) * p;
	p += vec2(0.82, -0.14) * sin(length(p) * 3.75 - time * 1.26) * 0.11;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.97 * p.y + time * 1.19); p.y += 0.35 / wf * cos(wf * 1.73 * p.x + time * 1.57); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.22, vec3(0.50, 0.51, 0.42), vec3(0.31, 0.43, 0.42), vec3(0.95, 1.19, 1.30), vec3(0.31, 0.92, 0.35));
	col = mod(col * 1.46, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
