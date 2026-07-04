uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.58, 0.0)) * 13.51 - t * 1.84 + ph);
    float mb = sin(length(p + vec2(0.58, 0.0)) * 35.81 - t * 4.98 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.08;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.52) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 1.65) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.62; }
	q1 *= 1.49;
	q2 = rot2(time * 0.55) * q2;
	q2.x += sin(q2.y * 6.71 + time * 1.78) * 0.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.96);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.97 + time * 0.04, vec3(0.41, 0.52, 0.50), vec3(0.41, 0.37, 0.48), vec3(1.27, 0.78, 0.87), vec3(0.31, 0.67, 0.03));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.77 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
