uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.25 * cos(sa * 9 + t * 1.51 + ph);
    v = sin((sr - petal) * 15.13);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.39 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.11, length(p) * 2.16 - time * 0.27); }
	p = fract(p * 2.34) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.19, vec3(0.44, 0.42, 0.55), vec3(0.48, 0.38, 0.50), vec3(1.22, 1.32, 1.06), vec3(0.47, 0.40, 0.59));
	col = fract(col * 1.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
