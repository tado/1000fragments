uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.64 + t * 4.37 + ph) + sin(p.y * 7.46 - t * 4.37 + ph)
        + sin((p.x + p.y) * 7.54 + t * 4.37 + ph) + sin(length(p) * 9.03 - t * 4.37 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.17;
	{ float fr = length(p); p *= 1.0 + -0.45 * fr * fr; }
	p = fract(p * 1.89) - 0.5;
	p = abs(p);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.30; p = rot2(2.55) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.10, 0.55), vec3(0.67, 0.74, 0.51), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
