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
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.87 * sin(mf + 3.0) + ph), cos(t * 1.87 * cos(mf + 3.0) + ph));
        ms += 0.035 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.58, 0.75) * sin(length(p) * 2.35 - time * 0.54) * 0.17;
	p = rot2(length(p) * 1.66 + time * 0.74) * p;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.43, length(p) * 3.84 - time * 0.60); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.64 + time * 0.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
