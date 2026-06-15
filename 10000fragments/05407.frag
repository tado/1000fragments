uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.05 + t * 2.65 + ph) + sin(p.y * 6.56 - t * 2.65 + ph)
        + sin((p.x + p.y) * 4.66 + t * 2.65 + ph) + sin(length(p) * 15.67 - t * 2.65 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	p = rot2(p.y * -2.69 + time * 0.42) * p;
	p = rot2(length(p) * 1.44 + time * 0.73) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.35; p = rot2(1.48) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.03), field(p, time, 2.06));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
