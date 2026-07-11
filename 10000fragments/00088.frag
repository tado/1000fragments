uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.03 + t * 0.92 + ph) + sin(p.y * 13.67 - t * 2.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.55) - 0.5;
	p *= 2.81;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.57; p = rot2(2.38) * p; }
	p = rot2(time * -1.39) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.39, 0.48), vec3(0.77, 0.62, 0.56), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
