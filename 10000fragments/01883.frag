uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.40 + sr * 11.62 - t * 1.82 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p += vec2(0.59, 0.12) * sin(length(p) * 5.88 - time * 1.48) * 0.36;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.14; p = rot2(1.20) * p; }
	p = rot2(1.79) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.38), field(p, time, 0.77));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
