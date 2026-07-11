uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.12 + t * 2.11 + ph) + sin(p.y * 12.41 - t * 3.51 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.19, vec3(0.40, 0.53, 0.48), vec3(0.42, 0.46, 0.31), vec3(1.31, 1.22, 0.70), vec3(0.55, 0.49, 0.03));
	col = clamp((col - 0.5) * 2.01 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
