uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.25, t * 1.48 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.62 + jf * 4.0), cos(t * 0.52 * jf)) * 0.31;
        xs += sin(length(p - im) * 152.19 - t * 13.24 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.04) * p;
	p = abs(p);
	p = rot2(length(p) * 1.49 + time * 0.77) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.68);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.75 + time * 0.23, vec3(0.55, 0.56, 0.45), vec3(0.45, 0.41, 0.42), vec3(1.38, 0.88, 0.84), vec3(0.65, 0.39, 0.87));
	col = fract(col * 1.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
