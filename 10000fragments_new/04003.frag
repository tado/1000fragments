uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.32 + t * 0.85 + ph) * 0.7;
    float wb = sin(p.y * 13.22 - t * 3.42 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.54;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.77 + vec2(t * 2.86, -t * 0.67) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	p = abs(p);
	p = rot2(p.y * 2.22 + time * 1.12) * p;
	p *= 2.33;
	p = rot2(0.83) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.96);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.96 + time * 0.06, vec3(0.49, 0.57, 0.51), vec3(0.43, 0.40, 0.45), vec3(0.89, 0.73, 1.36), vec3(0.57, 0.22, 0.81));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
