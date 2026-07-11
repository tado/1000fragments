uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.26 + sr * 5.79 - t * 0.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.42; p = rot2(2.44) * p; }
	{ float fr = length(p); p *= 1.0 + 0.69 * fr * fr; }
	p = rot2(length(p) * -3.34 + time * 1.46) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.23, 0.14), vec3(0.78, 0.98, 0.96), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
