uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.16 * cos(sa * 5 + t * 0.89 + ph);
    v = sin((sr - petal) * 15.15);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 14.85 - t * 7.13 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 26.44 - t * 7.13 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.13;
	p = abs(p) - 0.27;
	p = fract(p * 2.45) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.15, length(p) * 2.89 - time * 0.25); }
	{ float fr = length(p); p *= 1.0 + 0.28 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.05);
	float d = d1 + d2;
	vec3 col = palette(d * 1.28 + time * 0.24, vec3(0.60, 0.51, 0.50), vec3(0.31, 0.40, 0.44), vec3(1.17, 1.06, 0.72), vec3(0.37, 0.68, 0.59));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
