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
    v = sin(sa * 3.41 + sr * 21.22 - t * 4.52 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.00 + vec2(t * 1.55, -t * 1.55) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	p = abs(p) - 0.64;
	p = rot2(time * -1.17) * p;
	p = fract(p * 2.24) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.95);
	float d = d1 * d2;
	vec3 col = palette(d * 0.69 + time * 0.06, vec3(0.53, 0.47, 0.41), vec3(0.40, 0.32, 0.37), vec3(0.84, 1.30, 1.04), vec3(0.24, 0.47, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
