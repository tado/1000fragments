uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.50 + sin(p.y * 5.11 + t * 1.20) * 3.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.26, length(p) * 4.04 - time * 0.69); }
	p = fract(p * 2.36) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.05, vec3(0.54, 0.43, 0.54), vec3(0.38, 0.34, 0.43), vec3(1.24, 1.38, 1.14), vec3(0.64, 0.29, 0.86));
	col = clamp((col - 0.5) * 2.02 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
