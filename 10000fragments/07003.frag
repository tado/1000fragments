uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.56 + vec2(t * 1.70, -t * 1.70) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.98, t * 1.92 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.66;
	p += vec2(0.96, 0.05) * sin(length(p) * 2.79 - time * 0.93) * 0.21;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.83);
	float d = d1 + d2;
	vec3 col = palette(d * 1.03 + time * 0.24, vec3(0.55, 0.54, 0.55), vec3(0.34, 0.34, 0.36), vec3(0.84, 1.04, 1.04), vec3(0.54, 0.74, 0.67));
	col = mod(col * 2.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
