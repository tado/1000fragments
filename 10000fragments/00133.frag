uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.72 + t * 0.79 + ph) + sin(p.y * 2.39 - t * 3.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	p = rot2(length(p) * 2.68 + time * 0.33) * p;
	p = rot2(time * -1.30) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.01, vec3(0.46, 0.43, 0.42), vec3(0.46, 0.42, 0.40), vec3(1.05, 1.20, 1.34), vec3(0.45, 1.00, 0.98));
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
