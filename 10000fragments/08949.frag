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
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.34 * sin(mf + 3.0) + ph), cos(t * 1.34 * cos(mf + 3.0) + ph));
        ms += 0.096 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	p = abs(p) - 0.63;
	p = rot2(2.13) * p;
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.22; p = rot2(1.18) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.40 + time * 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
