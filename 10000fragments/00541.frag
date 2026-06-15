uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.10 + t * 2.55 + ph) + sin(p.y * 2.79 - t * 3.63 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.99 + vec2(t * 1.77, -t * 1.77) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.80);
	float d = d1 + d2;
	vec3 col = palette(d * 1.29 + time * 0.08, vec3(0.57, 0.43, 0.47), vec3(0.36, 0.44, 0.41), vec3(0.79, 1.05, 1.33), vec3(0.70, 0.19, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
