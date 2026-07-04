uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 5.64 * sin(t * 0.92) + t * 1.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.70) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.68;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.09));
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.95, 1.29, 0.70) + vec3(0.05, 0.09, 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
