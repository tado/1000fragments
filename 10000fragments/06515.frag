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
    float petal = 0.55 + 0.19 * cos(sa * 7 + t * 1.11 + ph);
    v = sin((sr - petal) * 15.04);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 21.67 - t * 6.47 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 27.24 - t * 6.47 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	p = rot2(length(p) * 1.61 + time * 0.59) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.07);
	float d = d1 + d2;
	vec3 col = palette(d * 1.01 + time * 0.24, vec3(0.54, 0.42, 0.51), vec3(0.41, 0.47, 0.31), vec3(1.16, 1.02, 1.17), vec3(0.43, 0.13, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
