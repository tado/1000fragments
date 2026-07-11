uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.12 + vec2(t * 1.63, -t * 1.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p *= 1.50;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.71, 0.95) * sin(length(p) * 2.75 - time * 1.13) * 0.30;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.25, vec3(0.59, 0.45, 0.52), vec3(0.41, 0.47, 0.50), vec3(0.99, 0.91, 1.29), vec3(0.69, 0.00, 0.51));
	col = fract(col * 2.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
