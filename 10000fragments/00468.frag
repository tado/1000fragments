uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.22 * cos(sa * 8 + t * 1.03 + ph);
    v = sin((sr - petal) * 11.10);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.35, -0.47) * sin(length(p) * 5.60 - time * 0.66) * 0.26;
	p = rot2(2.86) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.50; p = rot2(0.37) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.82, 1.35, 1.33) + vec3(0.16, 0.25, 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
