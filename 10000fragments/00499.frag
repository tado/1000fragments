uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.55 + sin(p.y * 4.96 + t * 1.14) * 1.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.57) - 0.5;
	p = abs(p) - 0.72;
	p *= 3.41;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.19, vec3(0.58, 0.46, 0.47), vec3(0.46, 0.46, 0.35), vec3(0.88, 0.99, 1.24), vec3(0.73, 0.57, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
