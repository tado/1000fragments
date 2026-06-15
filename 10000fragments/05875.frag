uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.51) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 0.63 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	p = rot2(time * -0.80) * p;
	p = rot2(p.y * 3.68 + time * 0.19) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.12; p = rot2(0.44) * p; }
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.01, 0.35, 0.18), vec3(0.52, 0.61, 0.90), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
