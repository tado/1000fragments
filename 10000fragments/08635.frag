uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.57 + t * 1.37 + ph) + sin(p.y * 13.16 - t * 1.74 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.88, lr * 1.04 + time * -0.13); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.25, vec3(0.56, 0.54, 0.47), vec3(0.47, 0.49, 0.31), vec3(1.27, 1.11, 0.77), vec3(0.16, 0.92, 0.91));
	col = mod(col * 2.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
