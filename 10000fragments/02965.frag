uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.33 - t * 7.93 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.13 + vec2(t * 2.99, -t * 2.99) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.36 * fr * fr; }
	p += vec2(0.54, -0.39) * sin(length(p) * 4.01 - time * 0.67) * 0.17;
	p = rot2(time * -1.33) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.46);
	float d = d1 + d2;
	vec3 col = palette(d * 0.93 + time * 0.21, vec3(0.56, 0.51, 0.48), vec3(0.50, 0.36, 0.46), vec3(1.26, 1.11, 1.06), vec3(0.77, 0.40, 0.73));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
