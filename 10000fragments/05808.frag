uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.23 + t * 0.64 + ph) + sin(p.y * 10.77 - t * 0.64 + ph)
        + sin((p.x + p.y) * 7.86 + t * 0.64 + ph) + sin(length(p) * 10.43 - t * 0.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.44; p = rot2(2.16) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.47));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
