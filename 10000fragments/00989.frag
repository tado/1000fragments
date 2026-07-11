uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.21 + sin(p.y * 2.46 + t * 2.95) * 4.74 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.52 + t * 3.79 + ph) + sin(p.y * 12.29 - t * 3.79 + ph)
        + sin((p.x + p.y) * 4.69 + t * 3.79 + ph) + sin(length(p) * 10.19 - t * 3.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.55);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.17 + time * 0.04, vec3(0.56, 0.52, 0.41), vec3(0.46, 0.37, 0.46), vec3(1.00, 0.79, 0.79), vec3(0.38, 0.27, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
