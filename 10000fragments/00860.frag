uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.69 + sin(p.y * 2.98 + t * 2.39) * 3.72 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.71 - t * 4.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	p *= 3.08;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 1.48 + time * 0.79); }
	p = abs(p);
	p = fract(p * 1.10) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.67 + time * 0.12, vec3(0.59, 0.53, 0.42), vec3(0.46, 0.43, 0.38), vec3(1.08, 0.89, 1.25), vec3(0.33, 0.33, 0.19));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
