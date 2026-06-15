uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.31 + sin(p.y * 4.19 + t * 2.47) * 1.37 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.97 - t * 2.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.44);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.61 + time * 0.03, vec3(0.52, 0.57, 0.41), vec3(0.37, 0.48, 0.48), vec3(1.24, 1.06, 1.31), vec3(0.26, 0.58, 0.98));
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
