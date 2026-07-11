uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.03 + sin(p.y * 3.52 + t * 4.01) * 2.96 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.49 + sin(p.y * 5.89 + t * 1.20) * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.63);
	float d = d1 * d2;
	vec3 col = palette(d * 1.66 + time * 0.06, vec3(0.55, 0.56, 0.56), vec3(0.36, 0.35, 0.48), vec3(0.83, 1.40, 1.02), vec3(0.78, 0.05, 0.40));
	col = fract(col * 1.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
