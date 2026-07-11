uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.70 + sin(p.y * 4.04 + t * 3.79) * 2.15 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	p = rot2(time * -0.47) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.93 + time * 0.09, vec3(0.52, 0.52, 0.56), vec3(0.50, 0.39, 0.49), vec3(1.13, 1.19, 1.13), vec3(0.13, 0.14, 0.99));
	col = fract(col * 1.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
