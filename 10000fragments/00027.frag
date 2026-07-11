uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.70 + t * 5.92 + ph) + sin(p.y * 3.56 - t * 3.00 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(0.39) * p;
	p += vec2(-0.54, -0.24) * sin(length(p) * 5.63 - time * 1.27) * 0.32;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.22, 0.28, 0.03), vec3(0.94, 0.70, 0.85), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
