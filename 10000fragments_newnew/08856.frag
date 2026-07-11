uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 31.84 - t * 6.69 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 32.33 - t * 2.77 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	{ p = vec2(atan(p.y, p.x) * 2.88, length(p) * 2.49 - time * 0.36); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.23, vec3(0.54, 0.49, 0.54), vec3(0.45, 0.38, 0.41), vec3(0.98, 0.70, 1.21), vec3(0.94, 0.65, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
