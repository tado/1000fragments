uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.98 + sr * 6.16 - t * 3.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.05, lr * 2.50 + time * -0.23); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.41 + time * 0.16, vec3(0.41, 0.53, 0.54), vec3(0.48, 0.35, 0.31), vec3(0.78, 1.28, 1.17), vec3(0.06, 0.62, 0.89));
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
