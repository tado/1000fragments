uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.31, t * 1.09 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.75;
	p = rot2(length(p) * -3.52 + time * 0.94) * p;
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	p *= 3.41;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.03, vec3(0.53, 0.51, 0.46), vec3(0.37, 0.34, 0.37), vec3(0.82, 1.19, 1.30), vec3(0.40, 0.87, 0.76));
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
