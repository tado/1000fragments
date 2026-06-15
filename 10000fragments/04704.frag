uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.35 + sr * 4.49 - t * 1.24 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.14 + vec2(t * 0.35, -t * 0.35) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p += vec2(-0.59, 0.83) * sin(length(p) * 4.00 - time * 1.13) * 0.37;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.23;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = d1 + d2;
	vec3 col = palette(d * 1.10 + time * 0.13, vec3(0.45, 0.49, 0.42), vec3(0.46, 0.40, 0.43), vec3(1.17, 0.95, 0.92), vec3(0.49, 0.87, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
