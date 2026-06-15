uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.72 + sin(p.y * 1.14 + t * 2.79) * 3.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.16, vec3(0.48, 0.48, 0.44), vec3(0.43, 0.46, 0.37), vec3(1.17, 0.97, 1.15), vec3(0.58, 0.71, 0.49));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
