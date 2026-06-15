uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.80 + sin(p.y * 5.28 + t * 2.38) * 4.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.02, vec3(0.55, 0.45, 0.56), vec3(0.46, 0.34, 0.49), vec3(1.18, 1.16, 1.12), vec3(0.72, 0.56, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
