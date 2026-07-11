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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.65 + jf * 4.0), cos(t * 0.20 * jf)) * 0.61;
        xs += sin(length(p - im) * 134.95 - t * 8.08 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(1.87) * p;
	p = rot2(p.y * -1.59 + time * 0.46) * p;
	p = abs(p) - 0.68;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.17, vec3(0.55, 0.60, 0.52), vec3(0.47, 0.38, 0.38), vec3(1.01, 0.78, 1.36), vec3(0.98, 0.25, 0.81));
	col = fract(col * 2.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
