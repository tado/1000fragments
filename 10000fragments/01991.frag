uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.47 + sr * 7.11 - t * 4.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	{ p = vec2(atan(p.y, p.x) * 2.79, length(p) * 4.38 - time * 0.61); }
	p = rot2(2.48) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.34; p = rot2(0.33) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.00), field(p, time, 2.00));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
