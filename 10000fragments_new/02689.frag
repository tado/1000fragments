uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.46 + 0.30 * pow(abs(cos(ra * 2.0 + t * 2.01)), 2.22);
    v = sin((rr - pet) * 20.93 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.11 * cos(sa * 7.0 + t * 1.32 + ph);
    v = sin((sr - petal) * 10.09);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	p = rot2(time * 1.17) * p;
	p *= 1.85;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.77);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.08 + time * 0.16, vec3(0.60, 0.50, 0.45), vec3(0.48, 0.40, 0.46), vec3(0.77, 1.26, 1.10), vec3(0.19, 0.69, 0.67));
	col = fract(col * 1.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
