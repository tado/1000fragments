uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.12 + t * 1.54 + ph) + sin(p.y * 10.01 - t * 1.54 + ph)
        + sin((p.x + p.y) * 6.86 + t * 1.54 + ph) + sin(length(p) * 10.73 - t * 1.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 2.57 + time * 0.67); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.91 + time * 0.23, vec3(0.44, 0.54, 0.47), vec3(0.49, 0.42, 0.42), vec3(1.07, 0.95, 1.21), vec3(0.73, 0.06, 0.46));
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
