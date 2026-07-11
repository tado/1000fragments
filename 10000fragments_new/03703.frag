uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.43 - t * 8.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.53;
	{ p = vec2(atan(p.y, p.x) * 2.95, length(p) * 4.70 - time * 0.78); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.41; p = rot2(1.94) * p; }
	p = rot2(time * 1.15) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.66));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
