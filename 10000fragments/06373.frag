uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.48;
    v = 0.5 * (sin(2.0 * cp.x + t * 2.07) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 1.91) * sin(2.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.18 + vec2(t * 1.38, -t * 2.24) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.00));
	q2 *= 3.15;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.39);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.91 + time * 0.01);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
