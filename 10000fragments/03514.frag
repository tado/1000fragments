uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.52 + 0.32 * pow(abs(cos(ra * 3.0 + t * 2.66)), 1.88);
    v = sin((rr - pet) * 19.25 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.33; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * 3.69 + time * 0.38) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.86));
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.09, 0.20), vec3(0.72, 0.58, 0.75), d);
	col = mod(col * 1.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
