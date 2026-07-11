uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.25 + sr * 13.66 - t * 4.83 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.26 * cos(sa * 6.0 + t * 2.45 + ph);
    v = sin((sr - petal) * 13.45);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.91 + (time * 0.54) * 0.95) * 0.12;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2((time * 0.54) * -1.07) * q1;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.64; }
	float d1 = fieldA(q1, (time * 0.54), 0.0);
	float d2 = fieldB(q2, (time * 0.54), 0.83);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.19, 0.42), vec3(0.48, 0.71, 0.61), smoothstep(0.0, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.914, 0.961, 1.022) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
