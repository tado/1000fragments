uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.61 + t * 3.76 + ph) + sin(p.y * 11.61 - t * 2.73 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.64 + vec2(t * 2.72, -t * 2.72) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	p = fract(p * 2.50) - 0.5;
	p += vec2(0.41, 0.28) * sin(length(p) * 5.56 - time * 0.92) * 0.20;
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.55 + time * 0.00, vec3(0.44, 0.44, 0.46), vec3(0.43, 0.37, 0.35), vec3(1.30, 1.14, 1.36), vec3(0.48, 0.11, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
