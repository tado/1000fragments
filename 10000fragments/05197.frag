uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.69 + t * 2.19 + ph) + sin(p.y * 2.76 - t * 2.19 + ph)
        + sin((p.x + p.y) * 5.77 + t * 2.19 + ph) + sin(length(p) * 5.67 - t * 2.19 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.45, -0.80) * sin(length(p) * 3.76 - time * 0.60) * 0.16;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(2.95) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.41), field(p, time, 0.82));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
