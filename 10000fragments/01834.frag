uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.26 + vec2(t * 2.05, -t * 1.39) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	p = rot2(length(p) * -3.67 + time * 0.33) * p;
	p = rot2(p.y * -2.90 + time * 0.60) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.07, vec3(0.60, 0.48, 0.58), vec3(0.39, 0.48, 0.40), vec3(0.95, 0.99, 0.84), vec3(0.86, 0.23, 0.99));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.04 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
