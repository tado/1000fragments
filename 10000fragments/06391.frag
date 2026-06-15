uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.10 + sin(p.y * 5.09 + t * 1.94) * 3.66 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.13 * cos(sa * 9 + t * 2.45 + ph);
    v = sin((sr - petal) * 9.64);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.53 * fr * fr; }
	p = abs(p) - 0.76;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.59);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.64 + time * 0.26, vec3(0.58, 0.44, 0.52), vec3(0.31, 0.40, 0.33), vec3(1.20, 1.07, 1.03), vec3(0.74, 0.71, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
