uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.73 + sr * 6.45 - t * 0.79 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.79 + vec2(t * 2.11, -t * 2.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.11, length(p) * 5.80 - time * 0.11); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.66);
	float d = d1 + d2;
	vec3 col = palette(d * 1.69 + time * 0.14, vec3(0.55, 0.45, 0.54), vec3(0.36, 0.34, 0.31), vec3(0.71, 1.27, 0.74), vec3(0.22, 0.19, 0.08));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
