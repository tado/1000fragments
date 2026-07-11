uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.10 * cos(sa * 7 + t * 0.40 + ph);
    v = sin((sr - petal) * 6.48);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	p = rot2(p.y * -2.10 + time * 0.11) * p;
	p += vec2(-0.94, -0.88) * sin(length(p) * 3.33 - time * 0.97) * 0.25;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.35; p = rot2(2.17) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.27), field(p, time, 0.55));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
