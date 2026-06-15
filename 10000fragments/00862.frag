uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 37.59 - t * 1.79 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 17.22 - t * 1.79 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p = rot2(length(p) * -1.39 + time * 0.22) * p;
	{ float fr = length(p); p *= 1.0 + -0.33 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.24, vec3(0.50, 0.55, 0.40), vec3(0.49, 0.47, 0.45), vec3(0.72, 0.93, 0.98), vec3(0.53, 0.93, 0.61));
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
