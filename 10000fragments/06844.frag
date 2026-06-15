uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.29 * cos(sa * 8 + t * 0.45 + ph);
    v = sin((sr - petal) * 17.75);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.58 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.22, vec3(0.57, 0.53, 0.46), vec3(0.36, 0.41, 0.48), vec3(0.98, 0.79, 1.00), vec3(0.34, 0.19, 0.96));
	col = clamp((col - 0.5) * 1.45 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
