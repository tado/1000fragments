uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.26 + t * 4.93 + ph) + sin(p.y * 14.81 - t * 2.11 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	{ p = vec2(atan(p.y, p.x) * 2.36, length(p) * 4.62 - time * 0.26); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.19; p = rot2(1.03) * p; }
	p += vec2(-0.13, 0.69) * sin(length(p) * 3.58 - time * 0.89) * 0.24;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.64));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
