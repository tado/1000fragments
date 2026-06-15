uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.17 + t * 1.88 + ph) + sin(p.y * 5.83 - t * 1.88 + ph)
        + sin((p.x + p.y) * 3.49 + t * 1.88 + ph) + sin(length(p) * 14.54 - t * 1.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -1.10 + time * 0.30) * p;
	{ float fr = length(p); p *= 1.0 + 0.25 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.49, 0.56), vec3(0.79, 0.53, 0.90), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
