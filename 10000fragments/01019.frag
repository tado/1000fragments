uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.20 + t * 2.33 + ph) + sin(p.y * 5.60 - t * 2.33 + ph)
        + sin((p.x + p.y) * 9.09 + t * 2.33 + ph) + sin(length(p) * 16.23 - t * 2.33 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.38; p = rot2(1.37) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.65));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
