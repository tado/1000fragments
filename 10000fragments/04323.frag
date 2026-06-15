uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.76 + t * 2.37 + ph) + sin(p.y * 3.38 - t * 3.45 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.61;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.21, vec3(0.53, 0.49, 0.43), vec3(0.33, 0.37, 0.48), vec3(1.38, 1.06, 1.18), vec3(0.38, 0.76, 0.86));
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
