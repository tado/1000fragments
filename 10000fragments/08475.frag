uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.58 - t * 5.03 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.63 + sin(p.y * 4.43 + t * 1.32) * 1.28 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.42, -0.61) * sin(length(p) * 3.72 - time * 1.97) * 0.30;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.23);
	float d = d1 + d2;
	vec3 col = palette(d * 1.03 + time * 0.16, vec3(0.59, 0.50, 0.40), vec3(0.38, 0.38, 0.42), vec3(1.31, 0.83, 0.86), vec3(0.36, 0.05, 0.93));
	col = fract(col * 1.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
