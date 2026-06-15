uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.13 * cos(sa * 5 + t * 1.03 + ph);
    v = sin((sr - petal) * 15.49);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.39;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.98 + time * 0.29, vec3(0.56, 0.52, 0.49), vec3(0.31, 0.32, 0.49), vec3(0.90, 1.22, 0.74), vec3(0.01, 0.13, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
