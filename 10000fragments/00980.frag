uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.29 * cos(sa * 5 + t * 2.21 + ph);
    v = sin((sr - petal) * 6.54);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.15 + sr * 4.64 - t * 1.86 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	{ float fr = length(p); p *= 1.0 + 0.30 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.54);
	float d = d1 * d2;
	vec3 col = palette(d * 1.02 + time * 0.10, vec3(0.53, 0.46, 0.50), vec3(0.32, 0.42, 0.49), vec3(1.04, 1.11, 1.21), vec3(0.79, 0.99, 0.56));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
