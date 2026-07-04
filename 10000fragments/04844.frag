uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.42 + sin(p.y * 3.80 + t * 1.05) * 3.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.31;
	p = (floor(p * 25.7) + 0.5) / 25.7;
	p = abs(p) - 0.36;
	{ p = vec2(atan(p.y, p.x) * 2.39, length(p) * 3.54 - time * 0.56); }
	p = rot2(time * 0.77) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.17, vec3(0.57, 0.49, 0.52), vec3(0.46, 0.41, 0.43), vec3(1.23, 1.14, 0.85), vec3(0.41, 0.61, 0.40));
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
