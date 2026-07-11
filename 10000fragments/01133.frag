uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.68 + t * 4.78 + ph) + sin(p.y * 9.29 - t * 4.78 + ph)
        + sin((p.x + p.y) * 6.14 + t * 4.78 + ph) + sin(length(p) * 6.93 - t * 4.78 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.32, lr * 2.65 + time * 0.27); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.15, vec3(0.41, 0.56, 0.41), vec3(0.31, 0.42, 0.31), vec3(1.12, 0.90, 0.72), vec3(0.31, 0.30, 0.30));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
