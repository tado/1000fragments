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
    float petal = 0.58 + 0.30 * cos(sa * 8 + t * 1.94 + ph);
    v = sin((sr - petal) * 9.26);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.00;
	p += vec2(-0.99, -0.48) * sin(length(p) * 5.48 - time * 1.22) * 0.37;
	p = rot2(p.y * -1.42 + time * 0.17) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 1.54 * p.y + time * 1.96); p.y += 0.28 / wf * cos(wf * 1.57 * p.x + time * 1.69); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.23, vec3(0.55, 0.46, 0.59), vec3(0.49, 0.30, 0.40), vec3(1.21, 1.34, 0.84), vec3(0.21, 0.28, 0.95));
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
