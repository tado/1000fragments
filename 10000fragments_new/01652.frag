uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.99 + t * 3.30 + ph) + sin(p.y * 2.87 - t * 3.11 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 8.58 - t * 7.75 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 13.30 - t * 1.62 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.49;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 *= 2.94;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.78);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.24 + time * 0.56);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
