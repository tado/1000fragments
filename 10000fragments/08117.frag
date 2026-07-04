uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 2.72 * sin(t * 1.15) + t * 3.21 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.37, t * 0.54 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.49 * fr * fr; }
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.47; }
	q2 *= 1.0 + 0.19 * sin(time * 1.52);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.98);
	float d = d1 * d2;
	vec3 col = palette(d * 0.95 + time * 0.17, vec3(0.41, 0.40, 0.57), vec3(0.33, 0.33, 0.49), vec3(1.32, 1.24, 1.00), vec3(0.51, 0.05, 0.38));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.28 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
