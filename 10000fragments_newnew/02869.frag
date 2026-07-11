uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.59 + 0.17 * pow(abs(cos(ra * 5.0 + t * 1.08)), 1.08);
    v = sin((rr - pet) * 12.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.28, vec3(0.49, 0.55, 0.43), vec3(0.32, 0.50, 0.40), vec3(1.40, 1.00, 1.36), vec3(0.70, 0.15, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
