uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.91 + t * 3.80 + ph) + sin(p.y * 8.49 - t * 3.80 + ph)
        + sin((p.x + p.y) * 6.26 + t * 3.80 + ph) + sin(length(p) * 10.74 - t * 3.80 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.75 - t * 4.90 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.87, length(q2) * 5.83 - time * 0.86); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.90);
	float d = min(d1, d2);
	vec3 col = vec3(1.00, 0.19, 0.58) * (0.17 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
