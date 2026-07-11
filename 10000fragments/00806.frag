uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.84 + sin(p.y * 4.73 + t * 1.22) * 2.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.13; p = rot2(0.35) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.32), field(p, time, 2.63));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
