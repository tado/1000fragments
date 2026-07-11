uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.30 * pow(abs(cos(ra * 5.0 + t * 2.82)), 2.81);
    v = sin((rr - pet) * 17.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -2.64 + time * 0.86) * p;
	p = rot2(0.31) * p;
	p = (floor(p * 14.0) + 0.5) / 14.0;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.37, 0.58), vec3(0.87, 0.56, 0.42), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
