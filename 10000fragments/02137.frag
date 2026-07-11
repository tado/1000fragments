uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.15 + sr * 8.33 - t * 4.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.47; p = rot2(0.94) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.17, length(p) * 5.81 - time * 0.50); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.29));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
