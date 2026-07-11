uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.18 - t * 4.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.65) * p;
	{ float fr = length(p); p *= 1.0 + -0.58 * fr * fr; }
	p = rot2(time * 0.34) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.15, vec3(0.51, 0.58, 0.46), vec3(0.41, 0.50, 0.41), vec3(0.98, 0.74, 1.28), vec3(0.90, 0.29, 0.84));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.13 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
