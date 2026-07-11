uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.12 - t * 5.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.67) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.33, length(p) * 2.07 - time * 0.26); }
	p = abs(p) - 0.71;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.07, vec3(0.42, 0.49, 0.49), vec3(0.39, 0.47, 0.36), vec3(1.27, 0.73, 1.04), vec3(0.32, 0.91, 0.85));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
