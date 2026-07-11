uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.28 + t * 4.35 + ph) + sin(p.y * 17.19 - t * 2.03 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.25;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.79, lr * 2.49 + time * -0.24); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.28, vec3(0.46, 0.44, 0.52), vec3(0.40, 0.49, 0.39), vec3(1.16, 1.11, 1.23), vec3(0.61, 0.44, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
