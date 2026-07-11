uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.42 + t * 1.75 + ph) + sin(p.y * 7.24 - t * 1.75 + ph)
        + sin((p.x + p.y) * 6.76 + t * 1.75 + ph) + sin(length(p) * 10.16 - t * 1.75 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(0.81) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.68 + time * 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
