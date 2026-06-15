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
    float petal = 0.32 + 0.15 * cos(sa * 7 + t * 0.61 + ph);
    v = sin((sr - petal) * 13.00);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.16;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.37 * p.y + time * 1.11); p.y += 0.43 / wf * cos(wf * 2.26 * p.x + time * 1.56); }
	p += vec2(0.17, -0.82) * sin(length(p) * 2.69 - time * 1.93) * 0.13;
	p = rot2(time * -0.28) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.01, vec3(0.44, 0.57, 0.50), vec3(0.35, 0.31, 0.43), vec3(1.11, 0.95, 0.98), vec3(0.31, 0.26, 0.11));
	col = fract(col * 1.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
