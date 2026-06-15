uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.70 + sin(p.y * 2.34 + t * 3.02) * 1.18 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.46, t * 0.77 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	p += vec2(0.94, 0.16) * sin(length(p) * 4.08 - time * 1.21) * 0.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.20 + time * 0.00, vec3(0.45, 0.59, 0.51), vec3(0.33, 0.32, 0.37), vec3(0.74, 1.06, 1.07), vec3(0.03, 0.63, 0.67));
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
