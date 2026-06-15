uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.44 + t * 0.62 + ph) + sin(p.y * 2.62 - t * 5.09 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.13 + sin(p.y * 5.58 + t * 3.54) * 2.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.39);
	float d = d1 * d2;
	vec3 col = palette(d * 1.61 + time * 0.22, vec3(0.46, 0.59, 0.45), vec3(0.42, 0.36, 0.43), vec3(1.38, 1.17, 1.09), vec3(0.50, 0.45, 0.89));
	col = mod(col * 1.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
