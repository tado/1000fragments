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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.14 * sin(mf + 3.0) + ph), cos(t * 2.14 * cos(mf + 3.0) + ph));
        ms += 0.073 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	{ p = vec2(atan(p.y, p.x) * 1.81, length(p) * 5.00 - time * 0.56); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.54; p = rot2(2.60) * p; }
	p = rot2(2.26) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.38 + time * 0.13);
	col = fract(col * 1.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
