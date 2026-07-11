uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.14 + jf * 4.0), cos(t * 0.32 * jf)) * 0.80;
        xs += sin(length(p - im) * 85.19 - t * 7.90 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	p += vec2(0.05, -0.29) * sin(length(p) * 2.11 - time * 1.49) * 0.31;
	{ p = vec2(atan(p.y, p.x) * 2.03, length(p) * 2.42 - time * 0.64); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.40; p = rot2(1.67) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.91 + time * 0.27, vec3(0.56, 0.49, 0.59), vec3(0.46, 0.36, 0.47), vec3(1.22, 1.22, 1.24), vec3(0.37, 0.33, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
