uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.88 + t * 3.92 + ph) + sin(p.y * 2.60 - t * 3.92 + ph)
        + sin((p.x + p.y) * 5.04 + t * 3.92 + ph) + sin(length(p) * 5.44 - t * 3.92 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.63) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.23, -0.73) * sin(length(p) * 5.65 - time * 0.81) * 0.24;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.10, vec3(0.42, 0.51, 0.56), vec3(0.31, 0.37, 0.32), vec3(1.27, 1.12, 0.95), vec3(0.37, 0.12, 0.61));
	col = mod(col * 2.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
