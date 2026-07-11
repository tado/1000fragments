uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.17 + t * 1.19 + ph) + sin(p.y * 5.45 - t * 1.19 + ph)
        + sin((p.x + p.y) * 6.54 + t * 1.19 + ph) + sin(length(p) * 5.92 - t * 1.19 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.07) * p;
	p += vec2(-0.78, -0.22) * sin(length(p) * 5.97 - time * 1.25) * 0.23;
	p = rot2(time * -0.52) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.04 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
