uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.48 + t * 3.93 + ph) + sin(p.y * 5.69 - t * 3.93 + ph)
        + sin((p.x + p.y) * 2.88 + t * 3.93 + ph) + sin(length(p) * 11.68 - t * 3.93 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.24 + vec2(t * 0.53, -t * 0.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	{ p = vec2(atan(p.y, p.x) * 1.52, length(p) * 3.77 - time * 0.34); }
	p *= 2.87;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.65);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.96 + time * 0.02, vec3(0.53, 0.57, 0.45), vec3(0.39, 0.33, 0.47), vec3(0.71, 0.71, 1.23), vec3(0.60, 0.86, 0.56));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
