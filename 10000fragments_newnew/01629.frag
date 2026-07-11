uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.51;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 19.83 - t * 5.36 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.25 * cos(sa * 9.0 + t * 1.24 + ph);
    v = sin((sr - petal) * 17.61);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(3.06) * q1;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.62; }
	q2 = rot2(time * -0.98) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.56);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.05, 0.20), vec3(0.74, 0.82, 0.40), cc);
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 2.58 + time * 4.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
