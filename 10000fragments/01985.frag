uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.64 + sr * 10.60 - t * 1.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	p += vec2(0.09, 0.17) * sin(length(p) * 3.31 - time * 1.35) * 0.14;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.33; p = rot2(2.34) * p; }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.65));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
