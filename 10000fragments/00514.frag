uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.04 + sin(p.y * 4.48 + t * 2.29) * 2.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.71;
	p = rot2(p.y * -3.26 + time * 0.67) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.39; p = rot2(0.84) * p; }
	p *= 3.41;
	p = abs(p) - 0.79;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.63 + time * 0.13);
	col = mod(col * 1.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
