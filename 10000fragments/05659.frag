uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.87 + sr * 19.99 - t * 1.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.76) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.56; p = rot2(0.57) * p; }
	p = rot2(1.22) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.34, 0.16), vec3(0.93, 0.54, 0.78), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
