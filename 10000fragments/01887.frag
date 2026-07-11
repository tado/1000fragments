uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.07 + sr * 21.24 - t * 1.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.42) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 2.68 + time * -0.67); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.03, vec3(0.43, 0.59, 0.46), vec3(0.32, 0.31, 0.48), vec3(0.84, 1.11, 0.98), vec3(0.91, 0.33, 0.48));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
