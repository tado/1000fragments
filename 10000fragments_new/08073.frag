uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.01 + t * 5.63 + ph) + sin(p.y * 8.13 - t * 1.53 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.35 + sin(p.y * 4.72 + t * 5.88) * 3.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.09);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.65 + time * 0.02, vec3(0.48, 0.46, 0.44), vec3(0.37, 0.30, 0.45), vec3(0.98, 1.12, 1.34), vec3(0.84, 0.63, 0.76));
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 2.39 + time * 15.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
