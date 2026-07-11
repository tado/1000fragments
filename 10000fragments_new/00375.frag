uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.80 + t * 2.97 + ph) + sin(p.y * 14.15 - t * 0.72 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	p = (floor(p * 12.8) + 0.5) / 12.8;
	p = fract(p * 1.63) - 0.5;
	p.y += sin(p.x * 5.24 + time * 1.81) * 0.13;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.60; p = rot2(1.17) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.87));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
