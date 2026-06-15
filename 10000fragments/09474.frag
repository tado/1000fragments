uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.79 + t * 3.98 + ph) + sin(p.y * 16.69 - t * 2.21 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.56; p = rot2(2.58) * p; }
	p = fract(p * 1.91) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.53), field(p, time, 1.05));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
