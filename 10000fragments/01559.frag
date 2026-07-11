uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.93 - t * 4.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	p = rot2(length(p) * 2.37 + time * 0.67) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.03, vec3(0.56, 0.45, 0.52), vec3(0.44, 0.46, 0.41), vec3(1.15, 1.05, 1.19), vec3(0.74, 0.07, 0.72));
	col = mod(col * 2.03, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
