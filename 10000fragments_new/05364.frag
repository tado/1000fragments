uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.67 + sin(p.y * 4.43 + t * 4.47) * 4.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.19;
	p = rot2(p.y * 2.24 + time * 0.48) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.27, vec3(0.47, 0.56, 0.46), vec3(0.36, 0.35, 0.34), vec3(1.39, 1.11, 0.76), vec3(0.62, 0.98, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
