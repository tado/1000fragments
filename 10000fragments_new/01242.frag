uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.01, t * 1.46 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.60, 0.0)) * 17.78 - t * 3.61 + ph);
    float mb = sin(length(p + vec2(0.60, 0.0)) * 38.62 - t * 1.14 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	p = rot2(time * 1.45) * p;
	p = (floor(p * 17.3) + 0.5) / 17.3;
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.88 + time * 0.11, vec3(0.41, 0.52, 0.58), vec3(0.50, 0.31, 0.33), vec3(0.94, 1.33, 1.20), vec3(0.34, 0.93, 0.54));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
