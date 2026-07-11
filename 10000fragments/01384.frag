uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.32 - t * 7.76 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	p = rot2(time * 1.04) * p;
	p = rot2(p.y * 1.42 + time * 0.53) * p;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.57 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.10, vec3(0.53, 0.45, 0.46), vec3(0.46, 0.34, 0.40), vec3(1.23, 1.06, 1.14), vec3(0.94, 0.63, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
