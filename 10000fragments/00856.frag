uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.41 + sin(p.y * 3.94 + t * 1.41) * 2.69 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.04 - t * 1.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.74);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.34 + time * 0.11, vec3(0.59, 0.55, 0.45), vec3(0.43, 0.36, 0.49), vec3(1.00, 0.85, 0.75), vec3(0.46, 0.74, 0.42));
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
