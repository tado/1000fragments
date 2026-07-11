uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 28.71 - t * 4.26 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 20.87 - t * 4.26 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.19; p = rot2(0.68) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.25, length(p) * 2.96 - time * 0.68); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.64));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
