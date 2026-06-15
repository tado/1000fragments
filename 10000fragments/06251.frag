uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.88 + sin(p.y * 3.94 + t * 3.91) * 1.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	p = rot2(p.y * 3.56 + time * 0.76) * p;
	{ float fr = length(p); p *= 1.0 + -0.74 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.05, vec3(0.54, 0.58, 0.55), vec3(0.40, 0.41, 0.31), vec3(0.90, 1.08, 1.26), vec3(0.93, 0.81, 0.45));
	col = mod(col * 1.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
