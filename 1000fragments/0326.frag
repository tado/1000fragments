uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.03 + sin(p.y * 2.51 + t * 5.61) * 2.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	p = abs(p);
	p = rot2(1.14) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.26, vec3(0.57, 0.40, 0.51), vec3(0.42, 0.31, 0.45), vec3(1.16, 1.10, 1.24), vec3(0.69, 0.75, 0.02));
	col = fract(col * 1.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
