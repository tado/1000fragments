uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 36.98 - t * 5.83 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 37.48 - t * 3.63 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.24 - t * 1.36 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -1.23 + time * 0.34) * q1;
	q1 = (floor(q1 * 18.4) + 0.5) / 18.4;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.22);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.44 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
