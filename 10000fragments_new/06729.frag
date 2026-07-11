uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.93 + vec2(t * 1.38, -t * 1.36) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	p.y += sin(p.x * 6.30 + time * 3.79) * 0.39;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.48;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.00, vec3(0.50, 0.57, 0.59), vec3(0.35, 0.34, 0.41), vec3(0.79, 0.96, 1.34), vec3(0.13, 0.58, 0.24));
	col = mod(col * 2.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
