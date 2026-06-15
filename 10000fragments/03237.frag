uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.35 + sin(p.y * 4.63 + t * 5.64) * 3.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.34; p = rot2(2.59) * p; }
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.40 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.90, 0.70, 1.06) + vec3(0.19, 0.19, 0.07);
	col = mod(col * 1.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
