uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.52 + t * 0.71 + ph) + sin(p.y * 6.36 - t * 0.71 + ph)
        + sin((p.x + p.y) * 6.94 + t * 0.71 + ph) + sin(length(p) * 8.28 - t * 0.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	p += vec2(0.25, 0.98) * sin(length(p) * 3.74 - time * 0.90) * 0.38;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -1.26) * p;
	p = fract(p * 2.51) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.13, 0.25), vec3(0.99, 0.53, 0.83), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
