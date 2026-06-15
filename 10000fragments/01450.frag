uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.17 + sin(p.y * 3.98 + t * 3.20) * 4.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	p *= 1.55;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.56; p = rot2(2.44) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.83, length(p) * 2.93 - time * 0.57); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.77));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
