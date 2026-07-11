uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.23 * cos(sa * 7 + t * 0.87 + ph);
    v = sin((sr - petal) * 8.42);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	{ float fr = length(p); p *= 1.0 + 0.27 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.22, vec3(0.46, 0.56, 0.44), vec3(0.34, 0.48, 0.47), vec3(1.36, 0.92, 0.83), vec3(0.45, 0.43, 0.67));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
