uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.40 + vec2(t * 0.48, -t * 0.48) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.28 * cos(sa * 3 + t * 2.90 + ph);
    v = sin((sr - petal) * 14.98);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.20;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.27; p = rot2(1.33) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 5.00 - time * 0.65); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = d1 + d2;
	vec3 col = palette(d * 0.96 + time * 0.24, vec3(0.46, 0.47, 0.58), vec3(0.47, 0.41, 0.46), vec3(1.04, 1.38, 0.76), vec3(0.97, 0.62, 0.39));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
