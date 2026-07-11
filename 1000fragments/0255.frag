uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.39 + t * 2.39 + ph) + sin(p.y * 5.13 - t * 3.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.06;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 2.00 + time * 0.05, vec3(0.50, 0.46, 0.44), vec3(0.30, 0.30, 0.40), vec3(1.29, 0.90, 1.27), vec3(0.17, 0.33, 0.94));
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
