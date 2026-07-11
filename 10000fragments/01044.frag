uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.72 + t * 2.97 + ph) + sin(p.y * 11.39 - t * 2.97 + ph)
        + sin((p.x + p.y) * 8.47 + t * 2.97 + ph) + sin(length(p) * 14.00 - t * 2.97 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.53 + vec2(t * 1.95, -t * 1.95) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.21;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.61 + time * 0.24, vec3(0.53, 0.49, 0.49), vec3(0.31, 0.50, 0.37), vec3(1.00, 1.02, 1.10), vec3(0.88, 0.74, 1.00));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
