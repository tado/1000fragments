uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.30 + sin(p.y * 4.19 + t * 4.85) * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	p = rot2(length(p) * 1.99 + time * 0.50) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.41; p = rot2(2.07) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.94), field(p, time, 1.89));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
