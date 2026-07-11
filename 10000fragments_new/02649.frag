uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.89 + t * 1.91 + ph) + sin(p.y * 5.11 - t * 2.03 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.11 + vec2(t * 1.02, -t * 0.40) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.30;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.44);
	float d = min(d1, d2);
	vec3 col = vec3(0.61, 0.84, 0.89) * (0.16 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
