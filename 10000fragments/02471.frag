uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.11) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 1.03 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.27 * cos(sa * 8 + t * 1.03 + ph);
    v = sin((sr - petal) * 7.98);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 1.91 * p.y + time * 1.55); p.y += 0.31 / wf * cos(wf * 3.00 * p.x + time * 1.50); }
	p = rot2(time * -1.18) * p;
	p += vec2(-0.13, -0.36) * sin(length(p) * 5.72 - time * 0.63) * 0.26;
	{ p = vec2(atan(p.y, p.x) * 1.68, length(p) * 5.03 - time * 0.72); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.64);
	float d = d1 + d2;
	vec3 col = palette(d * 0.52 + time * 0.20, vec3(0.40, 0.54, 0.59), vec3(0.40, 0.36, 0.36), vec3(0.97, 0.73, 0.74), vec3(0.28, 0.17, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
