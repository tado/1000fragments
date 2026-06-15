uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.48 - t * 2.50 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.91;
	{ p = vec2(atan(p.y, p.x) * 1.98, length(p) * 5.89 - time * 0.79); }
	p = rot2(1.40) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.29, vec3(0.50, 0.43, 0.60), vec3(0.37, 0.43, 0.49), vec3(1.23, 1.15, 1.06), vec3(0.55, 0.41, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
