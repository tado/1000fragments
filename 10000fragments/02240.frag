uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.30 + sr * 15.81 - t * 3.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.66;
	p = rot2(length(p) * -1.16 + time * 0.63) * p;
	p += vec2(0.03, -0.50) * sin(length(p) * 3.22 - time * 1.89) * 0.28;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(0.51) * p; }
	p = fract(p * 1.54) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.71));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
