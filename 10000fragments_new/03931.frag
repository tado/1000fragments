uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.19 + t * 1.50 + ph) + sin(p.y * 12.38 - t * 4.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 4.36 + time * 3.62) * 0.38;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.52; p = rot2(1.34) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.00, 0.47, 0.47), vec3(0.78, 0.84, 0.59), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
