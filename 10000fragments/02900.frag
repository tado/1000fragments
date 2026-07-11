uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.10 + vec2(t * 0.83, -t * 0.83) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.37 + t * 4.59 + ph) + sin(p.y * 11.06 - t * 3.24 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.20;
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 2.73 - time * 0.44); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = d1 * d2;
	vec3 col = palette(d * 1.05 + time * 0.30, vec3(0.44, 0.45, 0.50), vec3(0.47, 0.45, 0.44), vec3(1.26, 1.31, 1.12), vec3(0.51, 0.59, 0.10));
	col = mod(col * 2.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
