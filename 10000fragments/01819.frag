uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.89 + sr * 13.69 - t * 3.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.15;
	p = abs(p) - 0.39;
	{ float fr = length(p); p *= 1.0 + 0.27 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 3.04 - time * 0.17); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.76 + time * 0.29, vec3(0.59, 0.49, 0.45), vec3(0.45, 0.36, 0.50), vec3(0.70, 0.95, 1.39), vec3(0.18, 0.74, 0.23));
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
