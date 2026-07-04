uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.65 + vec2(t * 2.31, -t * 1.44) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.56 + t * 1.78 + ph) * 0.7;
    float wb = sin(p.y * 6.46 - t * 3.36 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.26;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.56;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.15);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.99, 0.59, 0.90) * (0.22 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
