uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.38 - t * 1.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -2.23 + time * 0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.02, vec3(0.57, 0.49, 0.40), vec3(0.45, 0.38, 0.35), vec3(1.03, 1.31, 0.82), vec3(0.33, 0.29, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
