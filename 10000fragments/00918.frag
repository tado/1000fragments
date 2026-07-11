uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.75 + t * 1.90 + ph) + sin(p.y * 11.77 - t * 1.90 + ph)
        + sin((p.x + p.y) * 7.74 + t * 1.90 + ph) + sin(length(p) * 5.34 - t * 1.90 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.52, length(p) * 2.19 - time * 0.71); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.41; p = rot2(0.74) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.74), field(p, time, 1.48));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
