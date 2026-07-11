uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.10 * cos(sa * 9.0 + t * 0.91 + ph);
    v = sin((sr - petal) * 9.08);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.27; p = rot2(1.58) * p; }
	p *= 1.53;
	p += vec2(-0.37, 0.45) * sin(length(p) * 2.31 - time * 1.63) * 0.24;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.31), field(p, time, 0.62));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
