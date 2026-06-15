uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.18 * cos(sa * 6 + t * 1.85 + ph);
    v = sin((sr - petal) * 13.57);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.04, vec3(0.42, 0.57, 0.58), vec3(0.40, 0.36, 0.38), vec3(1.16, 1.19, 0.72), vec3(0.99, 0.95, 0.27));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
