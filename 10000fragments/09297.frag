uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.37 + t * 0.60 + ph) + sin(p.y * 13.40 - t * 0.60 + ph)
        + sin((p.x + p.y) * 11.12 + t * 0.60 + ph) + sin(length(p) * 7.66 - t * 0.60 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.91 + jf * 4.0), cos(t * 0.14 * jf)) * 0.67;
        xs += sin(length(p - im) * 206.63 - t * 4.94 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	p = rot2(1.32) * p;
	p = rot2(p.y * -1.35 + time * 0.37) * p;
	p = fract(p * 2.02) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.64);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.71 + time * 0.02, vec3(0.41, 0.48, 0.57), vec3(0.30, 0.47, 0.32), vec3(0.80, 1.18, 1.20), vec3(0.35, 0.92, 0.21));
	col = mod(col * 1.68, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
