uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.20 + sr * 13.59 - t * 4.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.63, lr * 1.93 + time * -0.18); }
	p = abs(p);
	p = fract(p * 2.00) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.05, vec3(0.59, 0.60, 0.58), vec3(0.50, 0.36, 0.32), vec3(1.34, 0.86, 1.18), vec3(0.55, 0.90, 0.99));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
