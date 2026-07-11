uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.65 - t * 3.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.94, length(p) * 3.93 - time * 0.49); }
	p = rot2(p.y * 3.20 + time * 0.78) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.04, vec3(0.55, 0.59, 0.43), vec3(0.47, 0.40, 0.46), vec3(1.01, 0.96, 1.34), vec3(0.40, 0.68, 0.18));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
