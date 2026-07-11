uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.50 + vec2(t * 1.18, -t * 1.18) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p = fract(p * 2.06) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.01, vec3(0.43, 0.46, 0.53), vec3(0.40, 0.49, 0.48), vec3(0.79, 1.14, 0.72), vec3(0.15, 0.14, 0.19));
	col = fract(col * 1.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
