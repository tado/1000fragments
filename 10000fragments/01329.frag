uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.06 + t * 3.21 + ph) + sin(p.y * 7.01 - t * 3.21 + ph)
        + sin((p.x + p.y) * 3.84 + t * 3.21 + ph) + sin(length(p) * 10.53 - t * 3.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.11; p = rot2(0.82) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.03));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
