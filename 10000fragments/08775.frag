uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.65 * sin(mf + 3.0) + ph), cos(t * 1.65 * cos(mf + 3.0) + ph));
        ms += 0.084 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	{ p = vec2(atan(p.y, p.x) * 1.94, length(p) * 5.01 - time * 0.57); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.65, 0.11) * sin(length(p) * 3.91 - time * 1.78) * 0.35;
	p = rot2(p.y * 3.68 + time * 0.72) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.96 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
