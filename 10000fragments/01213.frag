uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.79 + t * 4.79 + ph) + sin(p.y * 9.64 - t * 4.79 + ph)
        + sin((p.x + p.y) * 2.01 + t * 4.79 + ph) + sin(length(p) * 16.88 - t * 4.79 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.71) * p;
	p = rot2(length(p) * 3.74 + time * 0.90) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.60, 0.78, 0.82) + vec3(0.14, 0.16, 0.28);
	col = mod(col * 2.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
