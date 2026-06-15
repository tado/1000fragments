uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.78 + t * 2.46 + ph) + sin(p.y * 4.93 - t * 3.51 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.50;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.47; p = rot2(2.11) * p; }
	p *= 2.88;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.38, 0.49, 0.03), vec3(0.70, 0.75, 0.43), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
