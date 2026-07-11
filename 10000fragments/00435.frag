uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.05 + t * 1.90 + ph) + sin(p.y * 15.15 - t * 3.18 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.12; p = rot2(1.49) * p; }
	p = rot2(length(p) * 3.41 + time * 0.53) * p;
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.62 + time * 0.06);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
