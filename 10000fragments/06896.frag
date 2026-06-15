uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.55 - t * 3.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	p *= 1.63;
	p = rot2(p.y * 2.30 + time * 0.87) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.04, vec3(0.42, 0.43, 0.58), vec3(0.39, 0.42, 0.47), vec3(0.76, 0.92, 0.88), vec3(0.41, 0.77, 0.35));
	col = clamp((col - 0.5) * 2.10 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
