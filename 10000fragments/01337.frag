uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.07 + t * 0.99 + ph) + sin(p.y * 2.38 - t * 0.99 + ph)
        + sin((p.x + p.y) * 8.49 + t * 0.99 + ph) + sin(length(p) * 4.55 - t * 0.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.84, lr * 2.74 + time * -0.37); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.06, vec3(0.43, 0.59, 0.45), vec3(0.45, 0.39, 0.33), vec3(1.19, 1.36, 0.75), vec3(0.05, 0.79, 0.97));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
