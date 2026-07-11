uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 36.06 - t * 2.68 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 38.73 - t * 1.86 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 1.77 + time * 1.04) * p;
	p.x += sin(p.y * 7.74 + time * 3.45) * 0.15;
	p += vec2(-0.20, 0.23) * sin(length(p) * 4.35 - time * 2.37) * 0.28;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.93, 1.42, 1.24) + vec3(0.13, 0.23, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
