uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 35.16 - t * 1.60 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 32.65 - t * 1.60 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.27 + vec2(t * 2.01, -t * 2.01) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 2.64 + time * 0.31) * p;
	{ p = vec2(atan(p.y, p.x) * 1.38, length(p) * 3.92 - time * 0.57); }
	p = rot2(length(p) * -1.25 + time * 0.82) * p;
	p = rot2(time * 0.22) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = d1 + d2;
	vec3 col = palette(d * 0.83 + time * 0.15, vec3(0.51, 0.55, 0.58), vec3(0.48, 0.37, 0.44), vec3(0.78, 0.95, 1.33), vec3(0.49, 0.98, 0.66));
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
