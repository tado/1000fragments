uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.40 + sr * 14.30 - t * 1.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.91 - t * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	{ p = vec2(atan(p.y, p.x) * 1.90, length(p) * 2.02 - time * 0.15); }
	{ float fr = length(p); p *= 1.0 + 0.67 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.30 + time * 0.10, vec3(0.45, 0.59, 0.48), vec3(0.36, 0.37, 0.41), vec3(1.18, 1.26, 1.05), vec3(0.13, 0.30, 0.09));
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
