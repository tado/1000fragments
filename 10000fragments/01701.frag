uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.76 + t * 3.58 + ph) + sin(p.y * 13.04 - t * 2.33 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.31 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.73, lr * 2.40 + time * -0.54); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.17, vec3(0.41, 0.40, 0.58), vec3(0.33, 0.46, 0.42), vec3(0.77, 0.96, 1.37), vec3(0.38, 0.30, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
