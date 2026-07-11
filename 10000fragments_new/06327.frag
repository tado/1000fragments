uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.82 + t * 1.46 + ph) + sin(p.y * 13.34 - t * 4.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.26;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.47; p = rot2(0.81) * p; }
	p.x += sin(p.y * 3.76 + time * 1.96) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.23, 0.36, 0.47) * (0.24 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = fract(col * 1.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
