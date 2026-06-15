uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.67 + vec2(t * 0.88, -t * 0.88) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.15, -0.83) * sin(length(p) * 3.75 - time * 0.98) * 0.25;
	p = fract(p * 2.53) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.24, vec3(0.48, 0.57, 0.50), vec3(0.43, 0.34, 0.48), vec3(1.24, 1.10, 0.87), vec3(0.49, 0.85, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
