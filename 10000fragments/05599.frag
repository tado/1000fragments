uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.25) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 2.12 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	p = rot2(0.69) * p;
	p = rot2(length(p) * 1.93 + time * 0.43) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.35; p = rot2(1.98) * p; }
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.32, 0.47, 0.07), vec3(0.61, 0.93, 0.96), d);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
