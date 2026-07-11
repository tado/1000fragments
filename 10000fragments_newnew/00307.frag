uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.04 + t * 1.75 + ph) + sin(p.y * 8.11 - t * 1.75 + ph)
        + sin((p.x + p.y) * 4.90 + t * 1.75 + ph) + sin(length(p) * 16.07 - t * 1.75 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.88;
    v = 0.5 * (sin(2.0 * cp.x + t * 0.99) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 2.04) * sin(2.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.00 + ph), vnoise2(p * 4.00 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.00 + 1.56 * wq + vec2(1.7, 9.2) + t * 0.75),
                   vnoise2(p * 4.00 + 3.39 * wq + vec2(8.3, 2.8) - t * 0.35));
    v = vnoise2(p * 4.00 + 1.50 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.93; }
	q1 = sin(q1 * 2.86 + time * 1.59) * 1.01;
	{ q3 = vec2(atan(q3.y, q3.x) * 1.02, length(q3) * 3.51 - time * 0.60); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.20);
	float d3 = fieldC(q3, time, 0.08);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.03, 1.06, 1.18) + vec3(0.20, 0.16, 0.07);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
