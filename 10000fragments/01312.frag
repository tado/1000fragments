uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.04 + t * 0.87 + ph) + sin(p.y * 13.10 - t * 1.92 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.65 + t * 1.64 + ph) * 0.7;
    float wb = sin(p.y * 17.40 - t * 1.00 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.53;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -1.02 + time * 1.08) * q1;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.96));
	{ q2 = vec2(atan(q2.y, q2.x) * 1.83, length(q2) * 5.62 - time * 0.79); }
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.61; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.85);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.21));
	vec3 col = palette(d * 1.49 + time * 0.32, vec3(0.44, 0.57, 0.42), vec3(0.49, 0.37, 0.46), vec3(1.24, 1.30, 1.05), vec3(0.40, 0.41, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
