uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.35 + sr * 23.23 - t * 3.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	p += vec2(0.58, 0.32) * sin(length(p) * 5.79 - time * 1.52) * 0.29;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.15, vec3(0.52, 0.48, 0.41), vec3(0.34, 0.46, 0.35), vec3(0.89, 1.04, 0.91), vec3(0.44, 0.79, 0.74));
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
