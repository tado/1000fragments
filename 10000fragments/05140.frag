uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.82 + t * 3.74 + ph) + sin(p.y * 17.76 - t * 1.51 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.88;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.33; p = rot2(1.33) * p; }
	p *= 3.43;
	{ p = vec2(atan(p.y, p.x) * 2.45, length(p) * 4.44 - time * 0.52); }
	p = rot2(1.20) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.73));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
