uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.94 + sr * 19.60 - t * 3.39 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.07) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	p *= 3.39;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.06, vec3(0.55, 0.48, 0.49), vec3(0.45, 0.48, 0.31), vec3(0.95, 1.06, 0.98), vec3(0.46, 0.26, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
