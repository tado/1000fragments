uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.03 - t * 6.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	{ p = vec2(atan(p.y, p.x) * 2.33, length(p) * 3.62 - time * 0.78); }
	p = rot2(time * 0.30) * p;
	p += vec2(-0.66, 0.37) * sin(length(p) * 2.31 - time * 1.54) * 0.29;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.44; p = rot2(0.35) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.88), field(p, time, 1.75));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
