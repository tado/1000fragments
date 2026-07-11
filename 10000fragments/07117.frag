uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.91, t * 1.03 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.26) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 2.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.79, length(p) * 3.72 - time * 0.66); }
	{ float fr = length(p); p *= 1.0 + 0.37 * fr * fr; }
	p = rot2(time * -0.23) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.39);
	float d = d1 * d2;
	vec3 col = palette(d * 1.45 + time * 0.11, vec3(0.47, 0.43, 0.45), vec3(0.44, 0.36, 0.38), vec3(1.32, 0.84, 0.76), vec3(0.23, 0.50, 0.94));
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
