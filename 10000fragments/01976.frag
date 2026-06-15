uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.35 + t * 5.61 + ph) + sin(p.y * 3.62 - t * 5.45 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.43 - t * 1.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.30);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.15 + time * 0.01, vec3(0.58, 0.57, 0.41), vec3(0.46, 0.39, 0.36), vec3(1.05, 0.90, 1.01), vec3(0.17, 0.69, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
