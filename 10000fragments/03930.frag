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
    float petal = 0.39 + 0.27 * cos(sa * 9 + t * 1.74 + ph);
    v = sin((sr - petal) * 14.16);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 19.76 - t * 2.49 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 20.33 - t * 2.49 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.11, length(p) * 4.55 - time * 0.79); }
	p *= 2.11;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.52; p = rot2(0.36) * p; }
	p = rot2(time * -1.13) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.58);
	float d = d1 + d2;
	vec3 col = palette(d * 0.91 + time * 0.28, vec3(0.58, 0.41, 0.50), vec3(0.41, 0.40, 0.37), vec3(1.16, 1.02, 1.17), vec3(0.33, 0.35, 0.77));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
