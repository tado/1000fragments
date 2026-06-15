uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.46 - t * 5.71 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.44 + t * 3.56 + ph) + sin(p.y * 8.83 - t * 3.24 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.30) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.47);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.51 + time * 0.06, vec3(0.58, 0.49, 0.45), vec3(0.36, 0.45, 0.50), vec3(1.03, 0.89, 0.76), vec3(0.68, 0.26, 0.85));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
