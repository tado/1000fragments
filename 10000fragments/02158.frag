uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.60 + sr * 5.18 - t * 2.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.91;
	{ p = vec2(atan(p.y, p.x) * 1.86, length(p) * 3.83 - time * 0.55); }
	p = rot2(length(p) * 2.00 + time * 0.50) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.38; p = rot2(1.79) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.34, 0.12), vec3(0.58, 0.59, 0.64), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
