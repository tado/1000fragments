uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.33 + t * 3.80 + ph) + sin(p.y * 14.87 - t * 3.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.21; p = rot2(2.11) * p; }
	p = rot2(p.y * -1.85 + time * 0.73) * p;
	p = fract(p * 1.22) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.77 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
