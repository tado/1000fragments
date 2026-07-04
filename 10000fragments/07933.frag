uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.12 + t * 4.20 + ph) + sin(p.y * 7.50 - t * 4.20 + ph)
        + sin((p.x + p.y) * 10.40 + t * 4.20 + ph) + sin(length(p) * 4.53 - t * 4.20 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.88) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 3.09 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.52;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.75, lr * 2.27 + time * -0.31); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.76);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.04 + time * 0.18, vec3(0.41, 0.44, 0.45), vec3(0.37, 0.42, 0.33), vec3(1.28, 1.31, 1.11), vec3(0.30, 0.83, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
