uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.75 - t * 7.88 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	p = rot2(length(p) * 2.23 + time * 0.95) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.49; p = rot2(0.32) * p; }
	p *= 2.12;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.41, 1.20, 0.84) + vec3(0.14, 0.05, 0.14);
	col = fract(col * 2.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
