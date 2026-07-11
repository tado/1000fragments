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
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.24 * sin(mf + 3.0) + ph), cos(t * 1.60 * cos(mf + 3.0) + ph));
        ms += 0.043 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.97;
	p = rot2(time * 0.90) * p;
	{ p = vec2(atan(p.y, p.x) * 1.11, length(p) * 2.12 - time * 0.77); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.10; p = rot2(0.77) * p; }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.37; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.70 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
