uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.98, t * 0.37 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -3.19 + time * 0.70) * p;
	p = abs(p) - 0.50;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.03, vec3(0.46, 0.44, 0.49), vec3(0.49, 0.42, 0.31), vec3(0.71, 1.14, 0.75), vec3(0.75, 0.49, 0.43));
	col = fract(col * 2.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
