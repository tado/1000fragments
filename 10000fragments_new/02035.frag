uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 31.71 - t * 6.12 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 23.97 - t * 7.55 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 24.82 - t * 4.40 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 17.59 - t * 5.05 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.12;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.74;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.07, length(q2) * 5.46 - time * 0.91); }
	q2 = rot2(length(q2) * 1.73 + time * 1.44) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.68);
	float d = d1 * d2;
	vec3 col = palette(d * 1.49 + time * 0.31, vec3(0.49, 0.45, 0.57), vec3(0.46, 0.42, 0.47), vec3(0.92, 0.76, 1.38), vec3(0.82, 0.68, 1.00));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.91 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
