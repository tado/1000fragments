uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.12 - t * 5.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.22 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.30; p = rot2(2.57) * p; }
	p += vec2(0.55, 0.16) * sin(length(p) * 4.40 - time * 1.72) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.86, 1.59, 1.25) + vec3(0.09, 0.28, 0.29);
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
