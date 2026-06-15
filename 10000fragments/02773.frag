uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.46 - t * 6.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.38;
	p = fract(p * 1.40) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.49; p = rot2(1.25) * p; }
	p = rot2(time * -0.50) * p;
	p = rot2(p.y * -3.23 + time * 0.72) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.23, 0.72, 0.99) + vec3(0.17, 0.17, 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
